import { Spin, Row, Col, Card } from "antd";
import { useState, useEffect } from "react";
import utils from "../utils";

const ProductCard = (props) => {
  const { Meta } = Card;
  return (
    <Card
      hoverable
      style={{ width: 250, height: 300 }}
      cover={<img alt={props.product.pname} src={props.product.imgUrls[0]} />}
    >
      <Meta title={props.product.pname} />
    </Card>
  );
};

const ProductsGrid = () => {
  const [products, setProductsState] = useState([]);
  useEffect(() => {
    utils.fetchProducts().then((productsData) => {
      console.log(productsData);
      setProductsState(productsData);
    });
  }, []);
  return (
    <Row align="middle" justify="center" gutter={16}>
      {products ? (
        products.map((product) => (
          <Col className="gutter-row">
            <ProductCard product={product} key={product._id} />
          </Col>
        ))
      ) : (
        <Spin />
      )}
    </Row>
  );
};

export default ProductsGrid;
