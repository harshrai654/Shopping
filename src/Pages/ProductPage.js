import { Row, Col, Carousel, Image, Button, Form, InputNumber } from "antd";

const ProductPage = (props) => {
  const product = props.location.state.product;
  return (
    <Row gutter={24}>
      <Col flex={3} offset={1}>
        <Carousel dotPosition="left" effect="fade" autoplay>
          {product.imgUrls &&
            product.imgUrls.map((img) => (
              <div>
                <Image src={img} width={500} height={400} />
              </div>
            ))}
        </Carousel>
      </Col>
      <Col flex={1} offset={1}>
        <Form
          onFinish={(values) => {
            let quantity = values.quantity ? values.quantity : 1;
            props.updateCart({ ...product, quantity, stock: product.quantity });
          }}
        >
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!product.quantity}
            >
              {product.quantity ? "Add to Cart" : "Out of Stock"}
            </Button>
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" type="number">
            <InputNumber min={1} max={product.quantity} defaultValue={1} />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ProductPage;
