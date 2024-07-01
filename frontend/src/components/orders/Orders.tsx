import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import backend from "../../common/backend";
import { Order, ProductOrder } from "../../models/PaymentModels";
import { Product } from "../../models/ProductModels";
import "../../style/style.css";
import AdminLinks from "../adminLinks/AdminLinks";

const Orders = () => {
    const [orderData, setOrderData] = useState<Order[]>();
    const [orderProducts, setOrderProducts] = useState<ProductOrder[]>();
    const [products, setProducts] = useState<Product[]>();
    const navigate = useNavigate();
    const role = localStorage.getItem("user-role");
    const userId = localStorage.getItem("user-id");

    useEffect(() => {
        if (!role || !userId || role !== "Admin") {
            alert("Samo Admin moze pristupiti ovoj stranici");
            navigate("/");
        } else if (!orderData) {
            fetchOrders();
        }
    }, []);

    useEffect(() => {
        if (orderData && !orderProducts) {
            fetchOrderProducts();
        }
    }, [orderData]);

    useEffect(() => {
        if (orderProducts && !products) {
            fetchProducts();
        }
    }, [orderProducts]);

    const fetchOrders = async () => {
        try {
            const response = await backend.get(`/dunkshop/porudzbina`);

            setOrderData(response.data);
        } catch (error: any) {
            alert(error);
        }
    };

    const fetchOrderProducts = async () => {
        try {
            const response = await backend.get(`/dunkshop/proizvodPorudzbina`);

            setOrderProducts(response.data);
        } catch (error: any) {
            alert(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await backend.get(`/dunkshop/proizvod`);

            setProducts(response.data);
        } catch (error: any) {
            alert(error);
        }
    };

    return (
        <>
            {role && userId && role === "Admin" && (
                <div>
                    <AdminLinks />
                    <h1 style={{ textAlign: "center" }}>Istorija porudzbina</h1>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {orderProducts?.map((item) => (
                            <Card key={uuidv4()}>
                                <Card.Title className="order_title">
                                    Proizvod:{" "}
                                    {
                                        products?.find(
                                            (x) =>
                                                x.proizvodID === item.proizvodID
                                        )?.nazivP
                                    }
                                </Card.Title>
                                <Card.Body>
                                    <Card.Text className="order_text_item">
                                        Cena proizvoda:{" "}
                                        {
                                            products?.find(
                                                (x) =>
                                                    x.proizvodID ===
                                                    item.proizvodID
                                            )?.cenaP
                                        }{" "}
                                        $
                                    </Card.Text>
                                    <Card.Text className="order_text_item">
                                        Kolicina: {item.kolicina}
                                    </Card.Text>
                                    <Card.Text className="order_text_item">
                                        ID kupca:{" "}
                                        {
                                            orderData?.find(
                                                (x) =>
                                                    x.porudzbinaID ===
                                                    item.porudzbinaID
                                            )?.korisnikID
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Orders;
