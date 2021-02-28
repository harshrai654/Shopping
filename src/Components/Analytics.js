import { Spin } from "antd";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import utils from "../utils";

const Analytics = (props) => {
  const temp = JSON.parse(localStorage.getItem("orders"));
  const [orders, setOrders] = useState(temp ? temp : -1);
  const productData = [];
  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      const pr = productData.find((product) => product.Product === order.pname);
      if (pr) {
        pr.Units += order.quantity;
      } else {
        productData.push({ Product: order.pname, Units: 1 });
      }
    });
  }

  console.log(productData);

  useEffect(() => {
    if (orders === -1) {
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
        <BarChart
          width={800}
          height={500}
          data={productData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Product" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Units" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
        // </ResponsiveContainer>
      )}
    </>
  );
};

export default Analytics;
