import { useState } from "react";
import { Row, Divider, Alert } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import utils from "../utils";
import SellerDashboard from "./SellerDashboard";
import ProductsGrid from "./ProductsGrid";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import Orders from "./Orders";

const Home = () => {
  const [tokenData, setToken] = useState({
    token: localStorage.getItem("token"),
    type: parseInt(localStorage.getItem("type")),
  });

  let prevCart = utils.getCartState();
  const [cartState, setCartState] = useState(prevCart);
  const [cartUpdate, setCartUpdate] = useState(0);

  return (
    <>
      {!tokenData && <Redirect to="/" />}
      {tokenData && tokenData.token && tokenData.type === 1 && (
        <Redirect to="/seller" />
      )}
      <Row>
        <Navbar
          cartState={cartState}
          setCartState={() => {
            let cartState = utils.getCartState();
            console.log(cartState);
            setCartState(cartState);
          }}
          token={tokenData ? tokenData.token : null}
          type={tokenData ? tokenData.type : 0}
          onLoggedIn={(token, type) => setToken({ token, type })}
          onLogOut={() => {
            utils.removeToken();
            setCartState({ items: [], order: { amount: 0 } });
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
            <SellerDashboard tokenData={tokenData} />
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
                  if (cartState.items.find((e) => product._id === e._id)) {
                    setCartUpdate(-1);
                  } else {
                    let items = [...cartState.items, product];
                    let order = cartState.order;
                    order.amount += product.quantity * product.price;

                    setCartState({ items, order });
                    utils.updateCart(items, order, tokenData);
                    setCartUpdate(1);
                  }
                }}
                {...props}
              />
            )}
          />
          <Route path="/cart" exact>
            <Cart
              cartState={cartState}
              updateCart={(cart) => setCartState(cart)}
              setCartState={() => setCartState(utils.getCartState())}
              tokenData={tokenData}
              setCartUpdate={(state) => setCartUpdate(state)}
              onLoggedIn={(token, type) => setToken({ token, type })}
            />
          </Route>
          <Route path="/orders">
            <Orders tokenData={tokenData} />
          </Route>
        </Switch>
      </Row>
    </>
  );
};

export default Home;
