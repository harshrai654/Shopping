import { useState } from "react";
import { Row, Divider, Alert } from "antd";
import Navbar from "../Components/Navbar";
import utils from "../utils";
import SellerDashboard from "./SellerDashboard";
import ProductsGrid from "./ProductsGrid";
import ProductPage from "./ProductPage";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = () => {
  const [tokenData, setToken] = useState({
    token: localStorage.getItem("token"),
    type: parseInt(localStorage.getItem("type")),
  });

  let prevCart = localStorage.getItem("cart");
  prevCart = prevCart ? JSON.parse(prevCart) : [];
  const [cartState, setCartState] = useState(prevCart);
  const [cartUpdate, setCartUpdate] = useState(0);

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
          cartState={cartState}
          setCartState={setCartState}
          token={tokenData ? tokenData.token : null}
          onLoggedIn={(token, type) => setToken({ token, type })}
          onLogOut={() => {
            utils.removeToken();
            setToken(null);
          }}
        />
        {cartUpdate === -1 && (
          <Alert
            closable
            message="Product already in cart!"
            type="warning"
            onClose={() => setCartUpdate(0)}
          />
        )}
        {cartUpdate === 1 && (
          <Alert
            closable
            message="Product Added to cart"
            type="success"
            onClose={() => setCartUpdate(0)}
          />
        )}
        <Divider />
      </Row>
      <Row>
        <Switch>
          <Route path="/seller" exact>
            <SellerDashboard />
          </Route>
          <Route path="/" exact>
            <ProductsGrid />
          </Route>
          <Route
            path="/product"
            exact
            render={(props) => (
              <ProductPage
                updateCart={(product) => {
                  if (cartState.find((e) => product === e)) {
                    setCartUpdate(-1);
                  } else {
                    setCartState([...cartState, product]);
                    setCartUpdate(1);
                  }
                }}
                {...props}
              />
            )}
          />
        </Switch>
      </Row>
    </>
  );
};

export default Home;
