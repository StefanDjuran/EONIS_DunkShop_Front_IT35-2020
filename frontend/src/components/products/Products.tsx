import { useEffect, useState } from "react";
import { Accordion, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backend from "../../common/backend";
import { buildQueryParams } from "../../common/functions";
import { CartItem } from "../../models/PaymentModels";
import { Product, SieveModel } from "../../models/ProductModels";
import "../../style/style.css";
import Cart from "../payment/Cart";
import Payment from "../payment/Payment";
import ProductCard from "./ProductCard";

const emptySieveModel: SieveModel = {
    filters: "",
    sorts: "",
    page: 1,
    pageSize: 3,
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>();
    const [allProducts, setAllProducts] = useState<Product[]>();
    const [sieveModel, setSieveModel] = useState<SieveModel>({});
    const [showPayModal, setShowPayModal] = useState<boolean>(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const navigate = useNavigate();
    const role = localStorage.getItem("user-role");
    const userId = localStorage.getItem("user-id");

    useEffect(() => {
        if (!role || !userId || role !== "User") {
            alert("Samo korisnik aplikacije moze pristupiti ovoj stranici");
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (!allProducts && role && userId && role === "User") {
            fetchProducts(true);
        }
    }, []);

    useEffect(() => {
        if (allProducts) {
            fetchProducts(false);
        }
    }, [sieveModel]);

    const fetchProducts = async (isAll: boolean) => {
        try {
            const queryParams = buildQueryParams(isAll ? {} : sieveModel);
            const response = await backend.get(
                `/dunkshop/proizvod?${queryParams}`
            );

            if (isAll) {
                setAllProducts(response.data);
                setSieveModel(emptySieveModel);
            } else {
                setProducts(response.data);
            }
        } catch (error: any) {
            alert(error);
        }
    };

    const renderProducts = () => {
        return (
            <>
                <div className="row">
                    {products?.map((product) => (
                        <div
                            key={product.proizvodID}
                            className="col-lg-4 col-md-4 col-sm-6 mb-4"
                        >
                            <ProductCard
                                product={product}
                                cart={cart}
                                setCart={setCart}
                            />
                        </div>
                    ))}
                </div>

                <Accordion>
                    {sieveModel !== emptySieveModel && (
                        <a
                            href=""
                            onClick={(e) => {
                                e.preventDefault();
                                setSieveModel(emptySieveModel);
                            }}
                        >
                            Ponisti filtere
                        </a>
                    )}

                    {/* PAGINACIJA */}
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Paginacija</Accordion.Header>
                        <Accordion.Body>
                            <Button
                                className="pagination_btn"
                                variant="dark"
                                disabled={sieveModel.page === 1}
                                onClick={() =>
                                    setSieveModel((prevState) => ({
                                        ...prevState,
                                        page: prevState.page! - 1,
                                    }))
                                }
                            >
                                Prethodna stranica
                            </Button>
                            <Button
                                className="pagination_btn"
                                variant="dark"
                                onClick={() =>
                                    setSieveModel((prevState) => ({
                                        ...prevState,
                                        page: prevState.page! + 1,
                                    }))
                                }
                            >
                                Sledeca stranica
                            </Button>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* SORTIRANJE */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Sortiraj po</Accordion.Header>
                        <Accordion.Body>
                            <Form.Select
                                onChange={(e) =>
                                    setSieveModel((prevState) => ({
                                        ...prevState,
                                        sorts: e.target.value,
                                    }))
                                }
                            >
                                <option value={"cenaP"}>Ceni - rastuce</option>
                                <option value={"nazivP"}>
                                    Nazivu - rastuce
                                </option>
                                <option value={"brendP"}>
                                    Nazivu brenda - rastuce
                                </option>
                                <option value={"-cenaP"}>
                                    Ceni - opadajuce
                                </option>
                                <option value={"-nazivP"}>
                                    Nazivu - opadajuce
                                </option>
                                <option value={"-brendP"}>
                                    Nazivu brenda - opadajuce
                                </option>
                            </Form.Select>
                        </Accordion.Body>
                    </Accordion.Item>

                    {/* PRETRAGA - FILTRIRANJE */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Filtriraj po</Accordion.Header>
                        <Accordion.Body>
                            {allProducts && allProducts.length && (
                                <>
                                    <div className="filter_item">
                                        <Form.Label>Brend</Form.Label>
                                        <Form.Select
                                            onChange={(e) =>
                                                setSieveModel((prevState) => ({
                                                    ...prevState,
                                                    filters: `brendP@=${e.target.value}`,
                                                }))
                                            }
                                        >
                                            {allProducts.map((option) => (
                                                <option
                                                    key={option.proizvodID}
                                                    value={option.brendP}
                                                >
                                                    {option.brendP}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                    <div className="filter_item">
                                        <Form.Label>Boja</Form.Label>
                                        <Form.Select
                                            onChange={(e) =>
                                                setSieveModel((prevState) => ({
                                                    ...prevState,
                                                    filters: `bojaP@=${e.target.value}`,
                                                }))
                                            }
                                        >
                                            {allProducts.map((option) => (
                                                <option
                                                    key={option.proizvodID}
                                                    value={option.bojaP}
                                                >
                                                    {option.bojaP}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                </>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </>
        );
    };

    return (
        <>
            {role && userId && role === "User" && (
                <>
                    {products ? (
                        renderProducts()
                    ) : (
                        <div className="centered_spinner">
                            <Spinner />
                        </div>
                    )}

                    {cart && cart.length ? (
                        <Cart cart={cart} setShowPayModal={setShowPayModal} />
                    ) : null}

                    {showPayModal && (
                        <Payment
                            product={products![0]}
                            setShowPayModal={setShowPayModal}
                            cart={cart}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default Products;
