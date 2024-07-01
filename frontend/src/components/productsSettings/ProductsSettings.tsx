import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backend from "../../common/backend";
import { Product } from "../../models/ProductModels";
import AdminLinks from "../adminLinks/AdminLinks";

const ProductsSettings = () => {
    const [products, setProducts] = useState<Product[]>();
    const navigate = useNavigate();
    const role = localStorage.getItem("user-role");
    const userId = localStorage.getItem("user-id");

    useEffect(() => {
        if (!role || !userId || role !== "Admin") {
            alert("Samo Admin moze pristupiti ovoj stranici");
            navigate("/");
        } else if (!products) {
            fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await backend.get("/dunkshop/proizvod");

            setProducts(response.data);
        } catch (error: any) {
            alert(error);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await backend.delete(`/dunkshop/proizvod/${id}`);

            window.confirm("Proizvod je uspesno obrisan.");
            window.location.reload();
        } catch (error: any) {
            alert("Ovaj proizvod nije moguce obrisati jer postoji u nekoj od porudzbina!");
        }
    };

    return (
        <>
            {role && userId && role === "Admin" && (
                <>
                    <AdminLinks />
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Naziv proizvoda</th>
                                <th>Cena</th>
                                <th>Brend</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.length &&
                                products.map((item) => (
                                    <tr key={item.proizvodID}>
                                        <td>{item.nazivP}</td>
                                        <td>{item.cenaP} $</td>
                                        <td>{item.brendP}</td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    deleteProduct(
                                                        item.proizvodID
                                                    )
                                                }
                                            >
                                                OBRISI
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default ProductsSettings;
