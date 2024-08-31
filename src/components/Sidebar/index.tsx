"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import FormDivider from "@/components/FormDivider";
import Rating from "@/components/Rating";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

import filters from "@/data/filters.json";
import useDebounce from "@/hooks/useDebounce";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkedCategory, setCheckedCategory] = useState<string[]>([]);
  const [priceValue, setPriceValue] = useState(400);
  const debouncedValue = useDebounce(priceValue, 500);

  const createQueryString = useCreateQueryString();

  const allCategoryParams = searchParams.getAll("category");
  const ratingQuery = searchParams.get("rating");

  const handlePriceChange = (e: any) => {
    setPriceValue(e?.target?.value);
  };

  useEffect(() => {
    router.push(
      pathname + "?" + createQueryString("price", String(priceValue))
    );
  }, [debouncedValue]);

  const handleChange = (e: any) => {
    if (e?.target?.checked) {
      setCheckedCategory((prev) =>
        prev ? [...prev, e.target?.value] : [e.target?.value]
      );
    } else {
      setCheckedCategory(
        checkedCategory?.filter((item) => item !== e.target?.value)
      );
    }
  };

  useEffect(() => {
    if (checkedCategory?.length > 0) {
      router.push(
        pathname +
          "?" +
          createQueryString("category", checkedCategory.join("-"))
      );
    }
  }, [checkedCategory, router]);

  // keep checked filtered queries after page refresh
  useEffect(() => {
    const initialChecks = allCategoryParams?.[0]?.split(",");
    setCheckedCategory(initialChecks);
  }, []);

  return (
    <Card className="border-card-bg bg-white sidebar-wrapper">
      <Card.Body className="text-filter-color">
        <Form>
          <Accordion defaultActiveKey={["0", "1", "2", "3", "4"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Form.Group>
                <Accordion.Header>
                  <Form.Label>Category</Form.Label>
                </Accordion.Header>
                <Accordion.Body>
                  {filters.category.map((category) => (
                    <div key={category} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        onChange={(e) => handleChange(e)}
                        id={category}
                        checked={checkedCategory?.includes?.(category)}
                        value={category}
                        label={category}
                      />
                    </div>
                  ))}
                </Accordion.Body>
              </Form.Group>
            </Accordion.Item>
            <FormDivider />
            <Accordion.Item eventKey="1">
              <Form.Group>
                <Accordion.Header>
                  <Form.Label>Ratings</Form.Label>
                </Accordion.Header>
                <Accordion.Body>
                  {filters.ratings.map((rating) => (
                    <div key={rating} className="mb-3">
                      <Form.Check // prettier-ignore
                        type="radio"
                        name="ratings"
                        id={String(rating)}
                        defaultChecked={rating === Number(ratingQuery)}
                        onChange={() =>
                          router.push(
                            pathname +
                              "?" +
                              createQueryString("rating", String(rating))
                          )
                        }
                        label={
                          <div className="d-flex align-items-center">
                            <Rating value={rating} className="ms-2" />
                            <span className="ms-2">{rating + " & up"}</span>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </Accordion.Body>
              </Form.Group>
            </Accordion.Item>

            <FormDivider />
            <Accordion.Item eventKey="2">
              <Form.Group>
                <Accordion.Header>
                  <Form.Label>Brand</Form.Label>
                </Accordion.Header>
                <Accordion.Body>
                  {filters.brand.map((brand) => (
                    <div key={brand} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        id={brand}
                        value={brand}
                        label={brand}
                      />
                    </div>
                  ))}
                </Accordion.Body>
              </Form.Group>
            </Accordion.Item>
            <FormDivider />
            <Accordion.Item eventKey="3">
              <Form.Group>
                <Accordion.Header>
                  <Form.Label>Price</Form.Label>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Range
                    min={0}
                    max={1000}
                    value={priceValue}
                    onChange={handlePriceChange}
                  />
                  <div className="d-flex align-items-center">
                    <Form.Control value="0" readOnly />
                    <Form.Control
                      onChange={handlePriceChange}
                      value={priceValue}
                      className="ms-4"
                    />
                  </div>
                </Accordion.Body>
              </Form.Group>
            </Accordion.Item>
            <FormDivider />
            <Accordion.Item eventKey="4">
              <Form.Group>
                <Accordion.Header>
                  <Form.Label>Size</Form.Label>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Range min={5} max={45} defaultValue={25} />
                  <div className="d-flex align-items-center">
                    <Form.Control defaultValue="5" />
                    <Form.Control defaultValue="25" className="ms-4" />
                  </div>
                </Accordion.Body>
              </Form.Group>
            </Accordion.Item>
          </Accordion>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
