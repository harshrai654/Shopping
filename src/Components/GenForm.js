import { Modal, Button, Form, Input } from "antd";

const GenForm = (props) => {
  //   const [visible, setVisible] = React.useState(false);
  //   const [confirmLoading, setConfirmLoading] = React.useState(false);
  //   const [modalText, setModalText] = React.useState('Content of the modal');

  //   const showModal = () => {
  //     setVisible(true);
  //   };

  //   const handleOk = () => {
  //     setModalText('The modal will be closed after two seconds');
  //     setConfirmLoading(true);
  //     setTimeout(() => {
  //       setVisible(false);
  //       setConfirmLoading(false);
  //     }, 2000);
  //   };

  //   const handleCancel = () => {
  //     console.log('Clicked cancel button');
  //     setVisible(false);
  //   };
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        title={props.title}
        visible={props.visibility}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        cancelText="Close"
        okText="Login"
        onCancel={props.onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              console.log(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name={props.title}
          onFinish={(values) => console.log(values)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
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
      </Modal>
    </>
  );
};
export default GenForm;
