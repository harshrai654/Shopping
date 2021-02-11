import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Divider } from "antd";
import utils from "../utils";
import NewProduct from "../Components/NewProduct";

const SellerDashboard = () => {
  const [sellerData, setSelllerData] = useState(1);
  const [productShow, setProductShow] = useState(false);

  useEffect(() => {
    utils
      .auth()
      .then((res) => {
        setSelllerData(res.data);
      })
      .catch(() => {
        utils.removeToken();
        setSelllerData(null);
        console.log("Invalid user");
      });
  }, []);
  return (
    <>
      {sellerData ? (
        sellerData === 1 ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            <Row gutter={24} justify="space-around" align="top">
              <Divider orientation="left">{sellerData.name}</Divider>
              <Col offset={1} flex={1}>
                <Button
                  onClick={() => setProductShow(!productShow)}
                  type={productShow ? "primary" : "dashed"}
                >
                  Create Product
                </Button>
              </Col>
              <Col flex={2}>{productShow && <NewProduct />}</Col>
            </Row>
          </div>
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default SellerDashboard;
