import { Accordion, Button } from "react-bootstrap";
import { calculatePrice } from "../../common/functions";
import { CartItem } from "../../models/PaymentModels";
import "../../style/style.css";

interface CartProps {
    cart: CartItem[];
    setShowPayModal: (value: boolean) => void;
}

const Cart = ({ cart, setShowPayModal }: CartProps) => {
    return (
        <div className="cart">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        Korpa - ukupna cena je {calculatePrice(cart)} $
                    </Accordion.Header>
                    <Accordion.Body>
                        <>
                            {cart.map((item) => (
                                <div key={item.product.proizvodID}>
                                    <p>
                                        <i>{item.amount} x </i>
                                        <b>{item.product.nazivP}</b>
                                    </p>
                                </div>
                            ))}
                            <Button
                                variant="dark"
                                onClick={() => setShowPayModal(true)}
                            >
                                Kreiraj porudzbinu
                            </Button>
                        </>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default Cart;
