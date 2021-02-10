import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import utils from "../utils";

const SellerDashboard = () => {
  const [sellerData, setSelllerData] = useState(1);
  useEffect(() => {
    utils
      .auth()
      .then((res) => {
        console.log(res.data);
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
          <div>Seller</div>
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default SellerDashboard;
