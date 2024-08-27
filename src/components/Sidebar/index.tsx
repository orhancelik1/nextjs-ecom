"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";

import FormDivider from "@/components/FormDivider";
import Rating from "@/components/Rating";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

import filters from "@/data/filters.json";
import RangeSlider from "./RangeSlider";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkedCategory, setCheckedCategory] = useState<string[]>([]);

  const createQueryString = useCreateQueryString();

  const allCategoryParams = searchParams.getAll("category");
  const ratingQuery = searchParams.get("rating");

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
          <Form.Group>
            <Form.Label>Category</Form.Label>
            {filters.category.map((category) => (
              <div key={category} className="mb-3">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  onChange={(e) => handleChange(e)}
                  id={category}
                  checked={checkedCategory?.includes?.(category)}
                  value={category}
                  label={category}
                />
              </div>
            ))}
          </Form.Group>
          <FormDivider />
          <Form.Group>
            <Form.Label>Ratings</Form.Label>
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
          </Form.Group>
          <FormDivider />
          <Form.Group>
            <Form.Label>Brand</Form.Label>
            {filters.brand.map((brand) => (
              <div key={brand} className="mb-3">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id={brand}
                  value={brand}
                  label={brand}
                />
              </div>
            ))}
          </Form.Group>
          <FormDivider />
          <RangeSlider />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
