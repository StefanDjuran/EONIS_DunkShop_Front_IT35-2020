import { Container, Nav, Navbar } from "react-bootstrap";
import "../style/style.css";

const NavMenu = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="navbar">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/" onClick={() => localStorage.clear()}>
                            Prijavljivanje
                        </Nav.Link>
                        <Nav.Link
                            href="/sign-up"
                            onClick={() => localStorage.clear()}
                        >
                            Registracija
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavMenu;
