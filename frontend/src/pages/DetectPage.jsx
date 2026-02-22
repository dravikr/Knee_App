import { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  ListGroup,
  Badge,
} from 'react-bootstrap';

function DetectPage() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [resultImage, setResultImage] = useState('');
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setResultImage('');
    setDetections([]);
    setError('');
  };

  const handleDetect = async () => {
    if (!imageFile) {
      setError('Please select a knee X-ray image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    setLoading(true);
    setError('');
    setResultImage('');
    setDetections([]);

    try {
      const res = await fetch('http://127.0.0.1:5000/detect', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResultImage(data.image || '');
      setDetections(data.detections || []);
    } catch (err) {
      console.error(err);
      setError('Detection failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getBadgeVariant = (className) => {
    if (!className) return 'secondary';
    const name = className.toLowerCase();
    if (name.includes('healthy') || name === '0') return 'success';
    if (name.includes('doubt') || name === '1') return 'info';
    if (name.includes('minimal') || name === '2') return 'primary';
    if (name.includes('moderate') || name === '3') return 'warning';
    if (name.includes('severe') || name === '4') return 'danger';
    return 'secondary';
  };

  return (
    <div className="detect-page">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold mb-1">Knee X-ray Detection</h2>
          <p className="text-muted mb-0">
            Upload a knee X-ray to view the predicted osteoarthritis severity and bounding boxes.
          </p>
        </Col>
      </Row>

      <Row className="gy-4">
        {/* Left panel: controls */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 rounded-4 mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Upload Image</Card.Title>
              <Form.Group controlId="imageUpload" className="mb-3">
                <Form.Label className="small text-muted">
                  Supported formats: JPG, JPEG, PNG
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </Form.Group>

              <div className="d-flex align-items-center gap-3 mb-2">
                <Button
                  variant="primary"
                  onClick={handleDetect}
                  disabled={loading || !imageFile}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      Running Detection...
                    </>
                  ) : (
                    'Run Detection'
                  )}
                </Button>

                {imageFile && (
                  <span className="small text-muted">
                    Selected: {imageFile.name}
                  </span>
                )}
              </div>

              {error && (
                <Alert variant="danger" className="mt-2">
                  {error}
                </Alert>
              )}

              <hr />

              <Card.Subtitle className="mb-2 text-uppercase small text-muted">
                Class legend
              </Card.Subtitle>
              <div className="d-flex flex-wrap gap-2 small">
                <Badge bg="success">0 - Healthy</Badge>
                <Badge bg="info">1 - Doubtful</Badge>
                <Badge bg="primary">2 - Minimal</Badge>
                <Badge bg="warning">3 - Moderate</Badge>
                <Badge bg="danger">4 - Severe</Badge>
              </div>

              <hr className="mt-3" />

              <Card.Subtitle className="mb-2 text-uppercase small text-muted">
                Notes
              </Card.Subtitle>
              <ul className="small text-muted mb-0">
                <li>Use frontal knee X-rays if possible.</li>
                <li>Predictions are for learning, not diagnosis.</li>
                <li>Results may vary with image quality and position.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Right panel: images + results */}
        <Col lg={8}>
          <Row className="gy-4">
            <Col md={6}>
              <Card className="shadow-sm border-0 rounded-4 h-100">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted small">
                    Original image
                  </Card.Subtitle>
                  <div className="image-frame">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Original"
                        className="img-fluid"
                      />
                    ) : (
                      <div className="placeholder-text">
                        No image selected
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm border-0 rounded-4 h-100">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted small">
                    Detection overlay
                  </Card.Subtitle>
                  <div className="image-frame">
                    {resultImage ? (
                      <img
                        src={resultImage}
                        alt="Detection result"
                        className="img-fluid"
                      />
                    ) : (
                      <div className="placeholder-text">
                        Run detection to see results
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <Card.Title className="mb-3">Detection details</Card.Title>
                  {detections.length === 0 ? (
                    <p className="text-muted small mb-0">
                      No predictions yet. Upload an image and click “Run Detection”.
                    </p>
                  ) : (
                    <ListGroup variant="flush">
                      {detections.map((det, idx) => (
                        <ListGroup.Item
                          key={idx}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <div className="fw-semibold">
                              <Badge
                                bg={getBadgeVariant(det.class)}
                                className="me-2"
                              >
                                {det.class}
                              </Badge>
                              <span className="small text-muted">
                                Confidence: {(det.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                            
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DetectPage;
