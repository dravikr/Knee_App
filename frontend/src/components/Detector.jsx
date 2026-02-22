import { useState } from 'react';
import { Card, Button, ProgressBar, Alert, Container, Row, Col } from 'react-bootstrap';

const Detector = () => {
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState('');
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setError('');
      
      const formData = new FormData();
      formData.append('image', file);
      
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/detect', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setResultImage(data.image);
        setDetections(data.detections);
      } catch (err) {
        setError('Detection failed. Ensure backend is running on port 5000.');
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Upload Knee X-ray Image</Card.Title>
              
              <div className="text-center mb-4">
                <input 
                  type="file" 
                  className="form-control" 
                  accept="image/*" 
                  onChange={handleUpload}
                  disabled={loading}
                />
              </div>

              {image && (
                <Row className="g-4 mb-4">
                  <Col md={6}>
                    <Card>
                      <Card.Img variant="top" src={image} style={{height: '300px', objectFit: 'contain'}} />
                      <Card.Footer className="text-center">Original</Card.Footer>
                    </Card>
                  </Col>
                  {resultImage && (
                    <Col md={6}>
                      <Card>
                        <Card.Img variant="top" src={resultImage} style={{height: '300px', objectFit: 'contain'}} />
                        <Card.Footer className="text-center">Detected</Card.Footer>
                      </Card>
                    </Col>
                  )}
                </Row>
              )}

              {loading && <ProgressBar animated now={75} className="mb-3" />}

              {detections.length > 0 && (
                <div className="mt-4">
                  <h5>Detections:</h5>
                  <div className="row">
                    {detections.map((det, i) => (
                      <div key={i} className="col-md-4 mb-2">
                        <Alert variant="info">
                          <strong>{det.class}</strong>: {det.confidence.toFixed(2)}
                        </Alert>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {error && <Alert variant="danger">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detector;