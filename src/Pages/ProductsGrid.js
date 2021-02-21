import { Spin, Row, Col, Card } from "antd";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import utils from "../utils";

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

const ProductsGrid = () => {
  const [products, setProductsState] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(false);

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
        <Row align="middle" justify="center" gutter={16}>
          {products ? (
            products.map((product) => (
              <Col className="gutter-row">
                <ProductCard
                  product={product}
                  key={product._id}
                  showProduct={() => setSelectedProduct(product)}
                />
              </Col>
            ))
          ) : (
            <Spin />
          )}
        </Row>
      )}
    </>
  );
};

export default ProductsGrid;
