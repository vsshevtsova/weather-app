import { ForecastData } from "../../services/api";
import { Card, Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

export const Forecast: React.FC<{ data: ForecastData[] }> = ({ data }) => {
  return (
    <Row gap={4}>
      {data.map((day) => (
        <Col key={day.date} className="p-0">
          <Card className="w-100 p-0">
            <Card.Header className="p-0">{day.date}</Card.Header>
            <Card.Body>
              <h2>{Math.round(day.temperature)}°C</h2>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
