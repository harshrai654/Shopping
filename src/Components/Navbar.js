import { useState } from "react";
import { PageHeader, Button } from "antd";
import GenForm from "./GenForm";

const Navbar = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [sellerLoginState, setSellerLoginState] = useState(false);
  const loginActions = props.token ? (
    <Button onClick={props.onLogOut} type="text">
      LogOut
    </Button>
  ) : (
    [
      <Button onClick={() => setLoginState(!loginState)} type="text" key="0">
        Login
      </Button>,
      <Button
        onClick={() => setSellerLoginState(!sellerLoginState)}
        type="text"
        key="1"
      >
        Seller Login
      </Button>,
    ]
  );
  return (
    <>
      <PageHeader
        title="Shopping"
        subTitle="app"
        ghost={false}
        extra={loginActions}
      />
      <GenForm
        title="Login"
        end="login"
        visibility={loginState}
        onCancel={() => setLoginState(!loginState)}
        onLoggedIn={props.onLoggedIn}
      />
      <GenForm
        title="Seller Login"
        end="sellerlogin"
        visibility={sellerLoginState}
        onCancel={() => setSellerLoginState(!sellerLoginState)}
        onLoggedIn={props.onLoggedIn}
      />
    </>
  );
};

export default Navbar;
