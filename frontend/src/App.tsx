import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./common/route-config";
import NavMenu from "./components/NavMenu";
import "./style/style.css";

function App() {
    return (
        <div className="whole_page">
            <NavMenu />
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            ></Route>
                        ))}
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
