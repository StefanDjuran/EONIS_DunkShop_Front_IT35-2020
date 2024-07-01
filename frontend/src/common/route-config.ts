import AddProducts from "../components/addProducts/AddProducts";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import Orders from "../components/orders/Orders";
import Products from "../components/products/Products";
import ProductsSettings from "../components/productsSettings/ProductsSettings";

const routes = [
    {path: '/', component: SignIn, expect: true},
    {path: '/sign-up', component: SignUp},
    {path: '/products', component: Products},
    {path: '/orders', component: Orders},
    {path: '/products-settings', component: ProductsSettings},
    {path: '/add-products', component: AddProducts}
]

export default routes;