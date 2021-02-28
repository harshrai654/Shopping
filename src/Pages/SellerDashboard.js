import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Divider } from "antd";
import utils from "../utils";
import NewProduct from "../Components/NewProduct";
import ProductsAdded from "../Components/ProductsAdded";
import Orders from "./Orders";
import Analytics from "../Components/Analytics";

const SellerDashboard = (props) => {
  const [sellerData, setSelllerData] = useState(1);

  const [productShow, setProductShow] = useState(false);
  const [productListShow, setProductListShow] = useState(false);
  const [orderListShow, setOrderListShow] = useState(false);
  const [showAnalytics, setshowAnalytics] = useState(false);

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
      {!props.tokenData.token && <Redirect to="/" />}
      {sellerData ? (
        sellerData === 1 ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            <Row gutter={6} align="top">
              <Divider orientation="left">{sellerData.name}</Divider>
              <Col span={8}>
                <Button
                  onClick={() => {
                    setProductShow(true);
                    setProductListShow(false);
                    setOrderListShow(false);
                    setshowAnalytics(false);
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
                    setshowAnalytics(false);
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
                    setshowAnalytics(false);
                  }}
                >
                  Show Orders
                </Button>
                <Button
                  type={showAnalytics ? "primary" : "dashed"}
                  onClick={() => {
                    setProductShow(false);
                    setProductListShow(false);
                    setOrderListShow(false);
                    setshowAnalytics(true);
                  }}
                >
                  Analytics
                </Button>
              </Col>
              <Col span={10}>
                {productShow && <NewProduct />}
                {productListShow && (
                  <ProductsAdded tokenData={props.tokenData} />
                )}
                {orderListShow && <Orders tokenData={props.tokenData} />}
                {showAnalytics && <Analytics tokenData={props.tokenData} />}
              </Col>
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
