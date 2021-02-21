import { Row, Col, Carousel, Image, Button } from "antd";

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
        <Button type="primary" onClick={() => props.updateCart(product)}>
          Add to Cart
        </Button>
      </Col>
    </Row>
  );
};

export default ProductPage;
