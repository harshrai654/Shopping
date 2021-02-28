import { Spin, Row, Col, Card, Button, Drawer, Alert } from "antd";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import utils from "../utils";

const categories = {
  all: "All",
  lap: "Laptops",
  mob: "Mobiles",
};

const ProductCard = (props) => {
  const { Meta } = Card;
  return (
    <Card
      onClick={props.showProduct}
      title={props.product.pname}
      hoverable
      style={{ width: 250, height: 300 }}
      cover={<img alt={props.product.pname} src={props.product.imgUrls[0]} />}
    >
      <Meta title={`₹${props.product.price}`} />
    </Card>
  );
};

const ProductsGrid = (props) => {
  const [products, setProductsState] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [category, setCategory] = useState("all");
  const [showCategory, setShowCategory] = useState(false);
  const allCategories = new Set();
  allCategories.add("all");
  products.forEach((pro) => allCategories.add(pro.category));

  useEffect(() => {
    utils.fetchProducts().then((productsData) => {
      // console.log(productsData);
      setProductsState(productsData);
    });
  }, []);
  return (
    <>
      {selectedProduct ? (
        <Redirect
          push
          to={{
            pathname: "/product",
            state: { product: selectedProduct },
          }}
        />
      ) : (
        <>
          <Row align="top" justify="start" gutter={2}>
            <Col offset={1}>
              <Button onClick={() => setShowCategory(true)}>Categories</Button>
            </Col>
            <Drawer
              title="Categories"
              placement="left"
              closable
              onClick={() => setShowCategory(false)}
              visible={showCategory}
              getContainer={false}
              style={{ position: "absolute" }}
            >
              {[...allCategories].map((cat) => (
                <Button
                  onClick={() => setCategory(cat)}
                  type={category === cat ? "primary" : "dashed"}
                  block
                >
                  {categories[cat]}
                </Button>
              ))}
            </Drawer>
          </Row>

          <Row justify="center" gutter={4}>
            {props.location && props.location.state.orderSuccess && (
              <Alert
                type="success"
                message="Order placed successfully!"
                closable
              />
            )}

            {products ? (
              products.map(
                (product) =>
                  (category === "all" || product.category === category) && (
                    <Col>
                      <ProductCard
                        product={product}
                        key={product._id}
                        showProduct={() => setSelectedProduct(product)}
                      />
                    </Col>
                  )
              )
            ) : (
              <Spin />
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default ProductsGrid;
