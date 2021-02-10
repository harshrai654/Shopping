import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Divider } from "antd";
import Navbar from "../Components/Navbar";
import utils from "../utils";

const Home = (props) => {
  const [tokenData, setToken] = useState({
    token: localStorage.getItem("token"),
    type: localStorage.getItem("type"),
  });
  return (
    <>
      {!tokenData && <Redirect to="/" />}
      {tokenData && tokenData.token && tokenData.type === 1 && (
        <Redirect to="/seller" />
      )}
      {tokenData && tokenData.token && tokenData.type === 0 && (
        <Redirect to="/shop" />
      )}
      <Row>
        <Navbar
          token={tokenData ? tokenData.token : null}
          onLoggedIn={(token, type) => setToken({ token, type })}
          onLogOut={() => {
            utils.removeToken();
            setToken(null);
          }}
        />
        <Divider />
      </Row>
      <Row>{props.children}</Row>
    </>
  );
};

export default Home;
