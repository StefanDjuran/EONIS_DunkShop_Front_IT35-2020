import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../common/backend";
import { roleClaim, userIdClaim } from "../../common/constants";
import { LoginData } from "../../models/UserModels";
import "../../style/style.css";

const emptyLoginData = { username: "", passwordHash: "" };

const SignIn = () => {
    const [formData, setFormData] = useState<LoginData>(emptyLoginData);
    const [token, setToken] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            let decodedJWT = JSON.parse(window.atob(token.split(".")[1]));
            localStorage.setItem("token", token);

            let role = decodedJWT[roleClaim];
            let userId = decodedJWT[userIdClaim];
            if (role && userId) {
                localStorage.setItem("user-role", role);
                localStorage.setItem("user-id", userId);

                role === "Admin" ? navigate("/orders") : navigate("/products");
            }
        }
    }, [token, navigate]);

    const fetchToken = async () => {
        try {
            const response = await backend.post("/Auth/Login", formData);
            setToken(response.data.token ?? null);
        } catch (err: any) {
            alert(err);
        }
    };

    return (
        <Form>
            <h3>Prijava korisnika</h3>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Unesite username"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            username: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Sifra</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Unesite sifru"
                    onChange={(e) =>
                        setFormData((prevState) => ({
                            ...prevState,
                            passwordHash: e.target.value,
                        }))
                    }
                />
            </Form.Group>

            <Button
                variant="dark"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    fetchToken();
                }}
            >
                Prijavi se
            </Button>

            <Link to={"/sign-up"} className="registration_link">
                Niste registrovani? Ovo je link za registraciju!
            </Link>
        </Form>
    );
};

export default SignIn;
