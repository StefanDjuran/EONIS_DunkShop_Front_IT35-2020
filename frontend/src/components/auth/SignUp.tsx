import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backend from "../../common/backend";
import { NewUser } from "../../models/UserModels";

const emptyNewUser: NewUser = {
    imeK: "",
    prezimeK: "",
    adresaK: "",
    gradK: "",
    brojtelefonaK: "",
    statusK: "Admin",
    username: "",
    passwordK: "",
};

const SignUp = () => {
    const [formData, setFormData] = useState<NewUser>(emptyNewUser);
    const mobileNumberPattern = /^\+?[0-9]+$/;
    const navigate = useNavigate();

    const validation = () => {
        if (
            !formData.imeK.length ||
            !formData.prezimeK.length ||
            !formData.adresaK.length ||
            !formData.gradK.length ||
            !formData.brojtelefonaK.length ||
            !formData.statusK.length ||
            !formData.username.length ||
            !formData.passwordK.length
        ) {
            return "Potrebno je popuniti sva polja u formi za registraciju!";
        }

        if (
            !mobileNumberPattern.test(formData.brojtelefonaK) ||
            formData.brojtelefonaK.length !== 13
        ) {
            return "Polje broj telefona sadrzi 9 cifara";
        }

        return "";
    };

    const register = async () => {
        let validationResult = validation();
        if (!validationResult.length) {
            try {
                await backend.post("/dunkshop/korisnik", formData);
                window.confirm("Novi korisnik je uspesno registrovan");
                navigate("/");
            } catch (err: any) {
                alert(err);
            }
        } else {
            alert(validationResult);
        }
    };

    return (
        <Form>
            <h3>Registracija</h3>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Ime</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Petar"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            imeK: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Prezime</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Petrovic"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            prezimeK: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Adresa</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Bulevar Oslobodjenja 1"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            adresaK: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Grad</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Novi Sad"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            gradK: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Broj telefona +381</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="611234567"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            brojtelefonaK: `+381${e.target.value}`,
                        }))
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Status</Form.Label>
                <Form.Select
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            statusK:
                                e.target.value === "User" ? "User" : "Admin",
                        }))
                    }
                >
                    <option>Admin</option>
                    <option>User</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            username: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Sifra</Form.Label>
                <Form.Control
                    type="password"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            passwordK: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Button
                variant="dark"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    register();
                }}
            >
                Registruj korisnika
            </Button>
        </Form>
    );
};

export default SignUp;
