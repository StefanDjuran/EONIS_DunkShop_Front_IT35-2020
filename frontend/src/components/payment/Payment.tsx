import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { STRIPE_KEY } from "../../common/constants";
import { CartItem, Delivery } from "../../models/PaymentModels";
import { Product } from "../../models/ProductModels";
import "../../style/style.css";
import CheckoutForm from "./CheckoutForm";
import DeliveryForm from "./DeliveryForm";

const stripePromise = loadStripe(STRIPE_KEY);

const emptyDelivery: Delivery = {
    adresaD: "",
    datumD: new Date(),
    gradD: "",
    drzavaD: "",
    postanskiBrojD: "",
    brojTelefonaD: "",
};

interface PaymentProps {
    setShowPayModal: (value: boolean) => void;
    product: Product;
    cart: CartItem[];
}

const Payment = ({ setShowPayModal, cart }: PaymentProps) => {
    const [delivery, setDelivery] = useState<Delivery>(emptyDelivery);

    return (
        <div className="modal show custom_modal">
            <Modal.Dialog>
                <Modal.Header
                    closeButton
                    onClick={() => setShowPayModal(false)}
                >
                    <Modal.Title>Forma za porucivanje</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <DeliveryForm setDelivery={setDelivery} />
                    <Elements stripe={stripePromise}>
                        <CheckoutForm delivery={delivery} cart={cart} />
                    </Elements>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default Payment;
