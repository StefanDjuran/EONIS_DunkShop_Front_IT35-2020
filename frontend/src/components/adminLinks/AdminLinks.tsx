import { Container, Nav, Navbar } from "react-bootstrap";

const AdminLinks = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="navbar">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/products-settings">Proizvodi</Nav.Link>
                        <Nav.Link href="/add-products">
                            Dodavanje proizvoda
                        </Nav.Link>
                        <Nav.Link href="/orders">Istorija porudzbina</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminLinks;
