import React, { useState } from "react";
import { Modal, Form, Input, Alert, Button } from "antd";
import utils from "../utils";

const GenForm = (props) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title={props.title}
        visible={props.visibility}
        confirmLoading={confirmLoading}
        cancelText="Close"
        okText="Login"
        onCancel={props.onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              setConfirmLoading(true);
              form.resetFields();

              utils
                .login(props.end, values)
                .then((res) => {
                  setConfirmLoading(false);
                  if (res.status === 200) {
                    setError(false);
                    props.onCancel();
                    props.onLoggedIn(res.data.token);
                    utils.saveToken(res.data.token, props.type);
                    if (!props.type) {
                      localStorage.setItem("uname", res.data.uname);
                      props.setUname(res.data.uname);
                      utils.updateCart(res.data.cart, null, res.data.token);
                      props.setCartState();
                    }
                  }
                })
                .catch(() => {
                  setConfirmLoading(false);
                  setError(true);
                });
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {error && <Alert message="Invalid Email or password" type="error" />}
        <br />
        <Form form={form} name={props.title}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="pass"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        <Button type="text" onClick={props.changeFormState}>
          Register
        </Button>
      </Modal>
    </>
  );
};
export default GenForm;
