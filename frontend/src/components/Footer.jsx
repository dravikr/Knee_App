import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="app-footer bg-dark text-light">
      <Container>
        <Row className="align-items-center gy-2">
          <Col md={6}>
            <span className="small">
              © {new Date().getFullYear()} Knee Osteoarthritis Care – Educational Use Only
            </span>
          </Col>
          <Col md={6} className="text-md-end">
            <span className="small">
              This app does not provide medical advice or replace a doctor.
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;