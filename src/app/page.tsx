import Hero from "@/components/Hero";
import ProductsList from "@/components/Products";
import Sidebar from "@/components/Sidebar";
import { Row, Col, Container } from "react-bootstrap";

const Home = () => {
  return (
    <main>
      <Hero />
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
    </main>
  );
};

export default Home;
