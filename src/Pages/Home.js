import { useState } from "react";
import { Row, Col, Divider } from "antd";
import Navbar from "../Components/Navbar";
import utils from "../utils";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      <Row>
        <Navbar
          token={token}
          onLoggedIn={(token) => setToken(token)}
          onLogOut={() => {
            utils.removeToken();
            setToken(null);
          }}
        />
        <Divider />
      </Row>
    </>
  );
};

export default Home;
