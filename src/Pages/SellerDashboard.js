import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Divider } from "antd";
import utils from "../utils";
import NewProduct from "../Components/NewProduct";
import ProductsAdded from "../Components/ProductsAdded";
import Orders from "./Orders";

const SellerDashboard = (props) => {
  const [sellerData, setSelllerData] = useState(1);
  const [productShow, setProductShow] = useState(false);
  const [productListShow, setProductListShow] = useState(false);
  const [orderListShow, setOrderListShow] = useState(false);

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
                  onClick={() => {
                    setProductShow(true);
                    setProductListShow(false);
                    setOrderListShow(false);
                  }}
                  type={productShow ? "primary" : "dashed"}
                >
                  Create Product
                </Button>
                <Button
                  type={productListShow ? "primary" : "dashed"}
                  onClick={() => {
                    setProductShow(false);
                    setProductListShow(true);
                    setOrderListShow(false);
                  }}
                >
                  Show Products
                </Button>
                <Button
                  type={orderListShow ? "primary" : "dashed"}
                  onClick={() => {
                    setProductShow(false);
                    setProductListShow(false);
                    setOrderListShow(true);
                  }}
                >
                  Show Orders
                </Button>
              </Col>
              {productShow && (
                <Col flex={2}>
                  <NewProduct />
                </Col>
              )}
              {productListShow && (
                <Col flex={2}>
                  <ProductsAdded tokenData={props.tokenData} />
                </Col>
              )}
              {orderListShow && (
                <Col>
                  <Orders tokenData={props.tokenData} />
                </Col>
              )}
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
