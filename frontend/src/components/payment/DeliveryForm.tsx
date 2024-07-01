import { Form } from "react-bootstrap";
import { Delivery } from "../../models/PaymentModels";

interface DeliveryFormProps {
    setDelivery: React.Dispatch<React.SetStateAction<Delivery>>;
}

const DeliveryForm = ({ setDelivery }: DeliveryFormProps) => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Adresa</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Unesite adresu dostave"
                    onChange={(e) =>
                        setDelivery((prevState) => ({
                            ...prevState,
                            adresaD: e.target.value,
                        }))
                    }
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Grad</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Unesite grad"
                    onChange={(e) =>
                        setDelivery((prevState) => ({
                            ...prevState,
                            gradD: e.target.value,
                        }))
                    }
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Drzava</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Unesite drzavu"
                    onChange={(e) =>
                        setDelivery((prevState) => ({
                            ...prevState,
                            drzavaD: e.target.value,
                        }))
                    }
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Postanski broj</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Unesite postanski broj"
                    onChange={(e) =>
                        setDelivery((prevState) => ({
                            ...prevState,
                            postanskiBrojD: e.target.value,
                        }))
                    }
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Broj telefona</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Unesite broj telefona"
                    onChange={(e) =>
                        setDelivery((prevState) => ({
                            ...prevState,
                            brojTelefonaD: e.target.value,
                        }))
                    }
                />
            </Form.Group>
        </Form>
    );
};

export default DeliveryForm;
