import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentMethod } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import backend from "../../common/backend";
import { calculatePrice, validateDeliveryForm } from "../../common/functions";
import {
    CartItem,
    Delivery,
    Order,
    ProductOrder,
} from "../../models/PaymentModels";
import "../../style/style.css";

const emptyOrder: Order = {
    porudzbinaID: "",
    ukupnaCena: 0,
    korisnikID: "",
    dostavaID: "",
};

interface CheckoutFormProps {
    delivery: Delivery;
    cart: CartItem[];
}

const CheckoutForm = ({ delivery, cart }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<Order>(emptyOrder);
    const [productOrdersCount, setProductOrdersCount] = useState<number>(0);
    const [paymentStripeMethod, setPaymentStripeMethod] =
        useState<PaymentMethod>();

    // nakon kreiranja dostave, nastavlja se proces placanja
    useEffect(() => {
        if (order && order !== emptyOrder && !order.porudzbinaID?.length) {
            createOrder();
        }
    }, [order]);

    // nakon kreiranja dostave i porudzbine, dodaje se record u proizvodPorudzbina tabeli
    useEffect(() => {
        if (
            order &&
            order !== emptyOrder &&
            order.porudzbinaID?.length &&
            productOrdersCount != cart.length
        ) {
            createOrders();
        }
    }, [order.porudzbinaID]);

    // kada je productOrdersCount jednak broju proizvoda u korpi tada je gotov proces dodavanja podataka o kupovini u bazu
    // nakon toga se vrsi Stripe proces
    useEffect(() => {
        if (productOrdersCount === cart.length) {
            setIsLoading(false);
            startStripePaymentProcess();
        }
    }, [productOrdersCount]);

    const sleep = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const createOrders = async () => {
        let porudzbinaID = order.porudzbinaID!;
        for (let i = 0; i < cart.length; i++) {
            const success = await createProductOrder(
                cart[i],
                porudzbinaID,
                i + 1
            );

            if (!success) {
                console.error(`Failed to create order for item at index ${i}`);
                return;
            }
            await sleep(2000);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateDeliveryForm(delivery)) {
            alert(
                "Forma za dostavu nije popunjena kako treba - potrebno je popuniti sva polja"
            );
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            return;
        }

        setIsLoading(true);

        // Create PaymentMethod
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (paymentMethod) {
            setPaymentStripeMethod(paymentMethod);
        }

        if (error) {
            setErrorMessage(error.message || "An unexpected error occurred.");
            setIsLoading(false);
            return;
        }

        let userId = localStorage.getItem("user-id");
        if (userId && userId.length) {
            createDelivery(userId);
        }
    };

    const startStripePaymentProcess = async () => {
        if (paymentStripeMethod && paymentStripeMethod.id) {
            try {
                const response = await backend.post("/payments", {
                    paymentMethodId: paymentStripeMethod.id,
                    price: calculatePrice(cart),
                    porudzbinaId: order.porudzbinaID,
                });
                if (response.data.success) {
                    window.confirm("Uspesno izvrsena porudzbina i uplata");
                    window.location.reload();
                }
            } catch (err: any) {
                alert(err);
            }
        }
    };

    const createDelivery = async (userId: string) => {
        try {
            const response = await backend.post("/dunkshop/dostava", delivery);

            setOrder({
                dostavaID: response.data.dostavaID,
                korisnikID: userId,
                ukupnaCena: calculatePrice(cart),
            });
        } catch (err: any) {
            alert(err);
        }
    };

    const createOrder = async () => {
        try {
            const response = await backend.post("/dunkshop/porudzbina", order);

            setOrder((prevState: Order) => ({
                ...prevState,
                porudzbinaID: response.data.porudzbinaID,
            }));
        } catch (err: any) {
            alert(err);
        }
    };

    const createProductOrder = async (
        cartItem: CartItem,
        porudzbinaID: string,
        index: number
    ) => {
        try {
            let productOrderPayload: ProductOrder = {
                kolicina: cartItem.amount,
                proizvodID: cartItem.product.proizvodID,
                porudzbinaID: porudzbinaID,
            };
            await backend.post(
                "/dunkshop/proizvodPorudzbina",
                productOrderPayload
            );

            setProductOrdersCount(index);

            return true;
        } catch (err: any) {
            alert(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment_form">
            <CardElement />
            <Button
                className="pay_btn"
                type="submit"
                disabled={!stripe || isLoading}
                variant="dark"
            >
                {isLoading ? "Proces u toku..." : "Plati"}
            </Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default CheckoutForm;
