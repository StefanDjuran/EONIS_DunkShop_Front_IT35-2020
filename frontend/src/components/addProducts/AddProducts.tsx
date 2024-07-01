import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backend from "../../common/backend";
import { NewProduct } from "../../models/ProductModels";
import AdminLinks from "../adminLinks/AdminLinks";

const emptyNewProduct: NewProduct = {
    nazivP: "",
    cenaP: 0,
    bojaP: "",
    brendP: "",
    kolicinaNaStanju: 0,
    dobavljacID: "E6B63AC1-A8C8-4834-8316-288E2CCE9721",
};

const AddProducts = () => {
    const [newProduct, setNewProduct] = useState<NewProduct>(emptyNewProduct);
    const navigate = useNavigate();
    const role = localStorage.getItem("user-role");
    const userId = localStorage.getItem("user-id");

    useEffect(() => {
        if (!role || !userId || role !== "Admin") {
            alert("Samo Admin moze pristupiti ovoj stranici");
            navigate("/");
        }
    }, []);

    const validation = () => {
        if (
            !newProduct.nazivP.length ||
            !newProduct.bojaP.length ||
            !newProduct.brendP.length ||
            newProduct.kolicinaNaStanju < 1 ||
            !newProduct.dobavljacID.length
        ) {
            return "Potrebno je popuniti sva polja u formi za dodavanje proizvoda!";
        }

        return "";
    };

    const addProduct = async () => {
        let validationResult = validation();
        if (!validationResult.length) {
            try {
                await backend.post("/dunkshop/proizvod", newProduct);

                window.confirm("Novi proizvod je uspesno dodat");
                navigate("/products-settings");
            } catch (err: any) {
                alert(err);
            }
        }
    };

    return (
        <div>
            {role && userId && role === "Admin" && (
                <>
                    <AdminLinks />
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>
                                    setNewProduct((prevState) => ({
                                        ...prevState,
                                        nazivP: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Cena</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setNewProduct((prevState) => ({
                                        ...prevState,
                                        cenaP: isNaN(value) ? 0 : value,
                                    }));
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Boja</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>
                                    setNewProduct((prevState) => ({
                                        ...prevState,
                                        bojaP: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Brend</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>
                                    setNewProduct((prevState) => ({
                                        ...prevState,
                                        brendP: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Kolicina</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    setNewProduct((prevState) => ({
                                        ...prevState,
                                        kolicinaNaStanju: isNaN(value)
                                            ? 0
                                            : value,
                                    }));
                                }}
                            />
                        </Form.Group>

                        <Button
                            variant="dark"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                addProduct();
                            }}
                        >
                            Kreiraj proizvod
                        </Button>
                    </Form>
                </>
            )}
        </div>
    );
};

export default AddProducts;
