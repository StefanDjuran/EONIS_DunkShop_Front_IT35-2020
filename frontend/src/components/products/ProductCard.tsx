import { Button, Card } from "react-bootstrap";
import { CartItem } from "../../models/PaymentModels";
import { Product } from "../../models/ProductModels";
import "../../style/style.css";

interface ProductCardProps {
    product: Product;
    cart: CartItem[];
    setCart: (value: CartItem[]) => void;
}

const ProductCard = ({ product, cart, setCart }: ProductCardProps) => {
    const updateCart = (prevItems: CartItem[]) => {
        if (prevItems.length === 0) {
            return [{ product: product, amount: 1 }];
        }

        const updatedItems = prevItems.map((item) =>
            item.product.proizvodID === product.proizvodID
                ? { ...item, amount: item.amount + 1 }
                : item
        );

        if (
            !updatedItems.some(
                (item) => item.product.proizvodID === product.proizvodID
            )
        ) {
            updatedItems.push({ product: product, amount: 1 });
        }

        return updatedItems;
    };

    return (
        <Card className="product">
            <Card.Body>
                <Card.Title className="order_title">
                    {product.nazivP}
                </Card.Title>
                <Card.Text className="order_text_item">
                    <b>Brend:</b> {product.brendP}
                </Card.Text>
                <Card.Text className="order_text_item">
                    <b>Boja:</b> {product.bojaP}
                </Card.Text>
                <Card.Text className="order_text_item">
                    <b>Cena:</b> {product.cenaP} $
                </Card.Text>
                <Button
                    variant="dark"
                    onClick={() => {
                        setCart(updateCart(cart));
                    }}
                    disabled={cart.find(item => item.product.proizvodID === product.proizvodID)?.amount! >= product.kolicinaNaStanju}
                >
                    Dodaj u korpu
                </Button>
                {cart.find(item => item.product.proizvodID === product.proizvodID)?.amount! >= product.kolicinaNaStanju ? (
                    <p style={{color: 'red'}}>Ovog proizvoda nema vise na stanju</p>
                ) : null}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
