import ProductsList from "@/components/Products";
import Sidebar from "@/components/Sidebar";
import { Row, Col, Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col xs={9}>
          <ProductsList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
