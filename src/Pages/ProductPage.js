import { Row, Col, Carousel, Image } from "antd";

const ProductPage = (props) => {
  const product = props.location.state.product;
  return (
    <Row gutter={24}>
      <Col offset={1}>
        <Carousel dotPosition="left" effect="fade" autoplay>
          {product.imgUrls &&
            product.imgUrls.map((img) => (
              <div>
                <Image src={img} width={500} height={400} />
              </div>
            ))}
          {/* <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div> */}
        </Carousel>
      </Col>
    </Row>
  );
};

export default ProductPage;
