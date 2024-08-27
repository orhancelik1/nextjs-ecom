import { Container } from "react-bootstrap";
import Icon from "@/components/Icon";
import Image from "next/image";

const navigation = ["Category", "Brand", "Contact", "FAQs"];

const Header = () => {
  return (
    <Container>
      <div className="header-wrapper">
        <div className="d-flex align-items-center gap-x-14">
          <div className="fs-32 fw-bold fst-italic">FashionHub</div>
          <nav className="d-flex gap-x-12">
            {navigation.map((nav) => {
              return <div key={nav}>{nav}</div>;
            })}
          </nav>
        </div>
        <div className="d-flex gap-x-4">
          <div className="icon-wrapper icon-wrapper-bag">
            <Icon icon="bag" size={24} className="icon" />
          </div>
          <div className="icon-wrapper icon-wrapper-bell">
            <Icon icon="bell" size={24} className="icon" />
          </div>
          <div className="d-flex align-items-center gap-x-3">
            <Image
              title="user profile picture"
              alt="user profile picture"
              src="/profile-pic.png"
              width={50}
              height={50}
            />
            <div>
              <div className="fs-12 fw-medium">Good Morning!</div>
              <div className="fs-6 fw-semibold">Scarlet Johnson</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
