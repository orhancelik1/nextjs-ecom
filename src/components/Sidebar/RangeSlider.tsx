import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import useDebounce from "@/hooks/useDebounce";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { usePathname, useRouter } from "next/navigation";

const RangeSlider = () => {
  const [priceValue, setPriceValue] = useState(400);
  const debouncedValue = useDebounce(priceValue, 500);

  const router = useRouter();
  const createQueryString = useCreateQueryString();
  const pathname = usePathname();

  const handleChange = (e: any) => {
    setPriceValue(e?.target?.value);
  };

  useEffect(() => {
    router.push(
      pathname + "?" + createQueryString("price", String(priceValue))
    );
  }, [debouncedValue]);

  return (
    <Form.Group>
      <Form.Label>Price</Form.Label>
      <Form.Range
        min={0}
        max={1000}
        value={priceValue}
        onChange={handleChange}
      />
      <div className="d-flex align-items-center">
        <Form.Control value="0" readOnly />
        <Form.Control
          onChange={handleChange}
          value={priceValue}
          className="ms-4"
        />
      </div>
    </Form.Group>
  );
};

export default RangeSlider;
