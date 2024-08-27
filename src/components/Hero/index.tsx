import Image from "next/image";
import { Button, Container } from "react-bootstrap";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <Container className="h-100 position-relative">
        <div className="d-flex justify-content-between">
          <div className="hero-left">
            <h1 className="hero-heading">
              Grab Upto 50% Off On
              <br />
              Selected Headphone
            </h1>
            <Button className="rounded-pill">Buy Now</Button>
          </div>
          <div className="hero-image-wrapper">
            <Image
              alt="headphone"
              src="/hero-image.png"
              width={244}
              height={270}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
