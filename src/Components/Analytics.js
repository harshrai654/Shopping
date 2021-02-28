import { Spin } from "antd";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import utils from "../utils";

const Analytics = (props) => {
  const temp = JSON.parse(localStorage.getItem("orders"));
  const [orders, setOrders] = useState(temp ? temp : -1);
  const productData = [];
  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      const pr = productData.find((product) => product.name === order._id);
      if (pr) {
        pr.value += order.quantity;
      } else {
        productData.push({ name: order._id, value: 1 });
      }
    });
  }

  console.log(productData);

  useEffect(() => {
    if (!orders) {
      utils
        .getOrders(props.tokenData)
        .then((res) => {
          console.log(res.status);
          if (res.status !== 200) {
            setOrders(0);
          } else {
            console.log(res.data);
            setOrders(res.data);
            localStorage.setItem("orders", JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          setOrders(0);
        });
    }
  }, []);
  return (
    <>
      {orders === -1 && <Spin />}
      {orders === 0 && <Redirect to="/" />}
      {Array.isArray(orders) && (
        // <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={productData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
        // </ResponsiveContainer>
      )}
    </>
  );
};

export default Analytics;
