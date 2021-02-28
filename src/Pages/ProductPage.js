import {
  Row,
  Col,
  Carousel,
  Image,
  Button,
  Form,
  InputNumber,
  Descriptions,
} from "antd";

const ProductPage = (props) => {
  const product = props.location.state.product;
  return (
    <Row justify="space-around">
      <Col span={10}>
        <Carousel dotPosition="left" effect="fade" autoplay>
          {product.imgUrls &&
            product.imgUrls.map((img) => (
              <div>
                <Image src={img} width={500} height={400} />
              </div>
            ))}
        </Carousel>
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

      <Col span={12}>
        <Descriptions title="Product Desciption">
          <Descriptions.Item>{product.desc}</Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default ProductPage;
