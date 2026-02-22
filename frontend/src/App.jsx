import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Home from './pages/Home';
import DetectPage from './pages/DetectPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-shell bg-light">
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand>Knee OA Detector</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/detect">Detection</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="app-main">
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<DetectPage />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;
