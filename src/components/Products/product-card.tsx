import { Button, Card } from "react-bootstrap";

import { Product } from "@/types";
import RatingComponent from "../Rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="border-card-bg bg-white">
      <Card.Body className="image-wrapper">
        <Card.Img
          className="card-image"
          variant="top"
          src="/product-image.png"
        />
      </Card.Body>
      <Card.Body className="d-flex justify-content-between">
        <Card.Title className="text-gray fs-18">
          {product.productName}
        </Card.Title>
        <Card.Title className="text-bright-grey fs-18">
          {"₹" + product.price}
        </Card.Title>
      </Card.Body>
      <Card.Body className="py-0">
        <Card.Text className="fs-14 text-secondary-gray">
          5 types of shoos available
        </Card.Text>
        <div className="d-flex align-items-center">
          <RatingComponent value={product.rating} />
          <span className="fs-14 ms-1 text-secondary-gray">{`(${product.ratingCount})`}</span>
        </div>
      </Card.Body>
      <Card.Body className="d-flex justify-content-between">
        <Button variant="primary" className="rounded-pill">
          Add To Cart
        </Button>
        <Button variant="secondary" className="rounded-pill">
          Add Shortlist
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
