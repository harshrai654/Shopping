import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Collapse } from "antd";
import utils from "../utils";
import UpdateProductForm from "./UpdateProductForm";

const { Panel } = Collapse;

const ProductsAdded = (props) => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    utils.getProductList(props.tokenData).then((res) => {
      if (res.status === 403) {
        setProductList(-1);
        console.log(res.status);
      } else {
        setProductList(res.data.products);
      }
    });
  }, [props.tokenData]);
  return (
    <>
      {productList === -1 ? (
        <Redirect to="/" />
      ) : (
        productList &&
        productList.length && (
          <Collapse accordion>
            {productList.map((product, index) => (
              <Panel header={product.pname} key={product._id}>
                <UpdateProductForm
                  product={product}
                  tokenData={props.tokenData}
                  setProduct={(product) => {
                    let newProductList = [...productList];
                    newProductList[index] = product;
                    setProductList(newProductList);
                  }}
                />
              </Panel>
            ))}
          </Collapse>
        )
      )}
    </>
  );
};

export default ProductsAdded;
