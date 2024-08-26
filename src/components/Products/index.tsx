"use client";

import { Row, Col } from "react-bootstrap";
import ResponsivePagination from "react-responsive-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import products from "@/data/products.json";
import ProductCard from "./product-card";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";

import "react-responsive-pagination/themes/bootstrap.css";

const ProductsList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const categoryQuery = searchParams.getAll("category")?.[0]?.split("-");
  const ratingQuery = searchParams.get("rating");
  const priceQuery = searchParams.get("price");
  const pageQuery = searchParams.get("page") ?? "1";

  console.log("priceQuery", priceQuery);

  const filteredProducts = products.filter(
    (item) =>
      (!categoryQuery || categoryQuery.includes(item.category)) &&
      (!ratingQuery || Number(ratingQuery) >= item.rating) &&
      (!priceQuery || Number(priceQuery) >= item.price)
  );

  const pageSize = 12;

  const paginatedProducts = filteredProducts.slice(
    (Number(pageQuery) - 1) * pageSize,
    Number(pageQuery) * pageSize
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleChange = (e: any) => {
    router.push(pathname + "?" + createQueryString("page", String(e)));
  };

  return (
    <>
      <Row className="gy-4">
        {paginatedProducts?.map((product) => {
          return (
            <Col md={12} lg={6} xxl={4} key={product?.id}>
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>
      <Col className="my-5">
        <ResponsivePagination
          current={Number(pageQuery)}
          total={totalPages}
          onPageChange={handleChange}
          previousLabel="Previous"
          nextLabel="Next"
        />
      </Col>
    </>
  );
};

export default ProductsList;
