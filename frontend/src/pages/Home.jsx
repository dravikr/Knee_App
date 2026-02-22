import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero mb-4">
        <Row className="align-items-center gy-4">
          <Col md={7}>
            <h1 className="display-6 fw-bold mb-3 text-primary">
              Knee Osteoarthritis Awareness and Detection
            </h1>
            <p className="lead text-muted mb-3">
              Knee osteoarthritis is a long‑term joint condition where the smooth cartilage
              in the knee slowly wears away, making movement painful and stiff.
            </p>
            <p className="mb-4 text-muted">
              This application helps visualize patterns in knee X‑ray images and supports
              learning about how osteoarthritis can affect the joint. It is meant for
              education and research, not for clinical diagnosis.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button as={Link} to="/detect" size="lg" variant="primary">
                Go to Detection
              </Button>
              <div className="d-flex flex-column small text-muted">
                <span>
                  <Badge bg="info" className="me-2">Educational</Badge>
                  <Badge bg="secondary">Non‑clinical</Badge>
                </span>
                <span className="mt-1">
                  Upload a knee X‑ray and explore the model’s predicted severity grade.
                </span>
              </div>
            </div>
          </Col>
          <Col md={5}>
            <Card className="shadow-sm border-0 rounded-4 home-hero-card">
              <Card.Body>
                <Card.Title className="mb-3">What Happens in the Knee?</Card.Title>
                <Card.Text className="text-muted">
                  In a healthy knee, cartilage works as a smooth cushion between the bones,
                  allowing the joint to bend and move without friction.
                </Card.Text>
                <Card.Text className="text-muted">
                  In osteoarthritis, this cartilage becomes thinner and rougher. Bones may
                  start to rub against each other, causing pain, swelling, and a grinding
                  or cracking feeling during movement.
                </Card.Text>
                <Card.Text className="text-muted mb-0">
                  Over time, the joint space narrows, bone spurs can appear, and simple
                  activities like walking, sitting down, or climbing stairs may become
                  difficult.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default Home;