import { Spin, Row, Col, List, Typography, Tag, Collapse, Select } from "antd";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import utils from "../utils";

const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const Orders = (props) => {
  const temp = props.location ? props.location.state.order : -1;
  const [order, setOrder] = useState(temp);
  useEffect(() => {
    if (!props.location) {
      utils.getOrders(props.tokenData).then((res) => {
        console.log(res.data);
        if (res.status === 403) {
          setOrder(0);
        } else {
          console.log(res.data);
          setOrder(res.data);
        }
      });
    }
  }, [props.tokenData, props.location]);
  return (
    <Row gutter={16}>
      <Col offset={2} span={24}>
        {order === -1 && <Spin />}
        {order === 0 && <Redirect to="/" />}
        {Array.isArray(order) && (
          <List
            itemLayout="vertical"
            header={<h2>Orders</h2>}
            dataSource={order}
            renderItem={(orderItem) => (
              <List.Item
                key={orderItem._id}
                extra={[
                  <img width={100} alt="product" src={orderItem.imgUrls[0]} />,
                ]}
                actions={[
                  <Text
                    code
                  >{`${orderItem.price} X${orderItem.quantity}`}</Text>,
                  <Text mark>{`₹${orderItem.amount}`}</Text>,
                  <Text keyboard>{orderItem.at}</Text>,
                ]}
              >
                <h4>{orderItem.pname}</h4>
                {!props.tokenData.type && (
                  <Tag
                    icon={
                      orderItem.delivered ? (
                        <CheckCircleOutlined />
                      ) : (
                        <SyncOutlined spin />
                      )
                    }
                    color={orderItem.delivered ? "success" : "processing"}
                  >
                    {orderItem.delivered ? "Delivered" : "Pending"}
                  </Tag>
                )}
                {props.tokenData.type && (
                  <>
                    {!orderItem.delivered ? (
                      <Select
                        placeholder={
                          orderItem.delivered ? "Delivered" : "Pending"
                        }
                        defaultValue={orderItem.delivered}
                        onChange={(val) =>
                          utils.updateOrderStatus(
                            props.tokenData,
                            val,
                            orderItem.orderId,
                            orderItem.customerId
                          )
                        }
                      >
                        <Option value={false}>Pending</Option>
                        <Option value={true}>Delivered</Option>
                      </Select>
                    ) : (
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Delivered"
                      </Tag>
                    )}

                    <Collapse>
                      <Panel header="Customer details">
                        <h5>Name:</h5>
                        <p>{orderItem.name}</p>
                        <p>{orderItem.email}</p>
                      </Panel>
                    </Collapse>
                  </>
                )}
              </List.Item>
            )}
          ></List>
        )}
      </Col>
    </Row>
  );
};

export default Orders;
