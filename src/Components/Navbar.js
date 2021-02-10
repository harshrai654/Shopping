import { useState } from "react";
import { PageHeader, Button, Modal } from "antd";
import GenForm from "./GenForm";

const Navbar = () => {
  const [loginState, setLoginState] = useState(false);
  const [sellerLoginState, setSellerLoginState] = useState(false);

  return (
    <>
      <PageHeader
        title="Shopping"
        subTitle="app"
        ghost={false}
        extra={[
          <Button
            onClick={() => setLoginState(!loginState)}
            type="text"
            key="0"
          >
            Login
          </Button>,
          <Button
            onClick={() => setSellerLoginState(!sellerLoginState)}
            type="text"
            key="1"
          >
            Seller Login
          </Button>,
        ]}
      />
      <GenForm
        title="Login"
        visibility={loginState}
        onCancel={() => setLoginState(!loginState)}
      />
      <GenForm
        title="Seller Login"
        visibility={sellerLoginState}
        onCancel={() => setSellerLoginState(!sellerLoginState)}
      />
    </>
  );
};

export default Navbar;
