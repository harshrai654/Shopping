import { Form, Input, Spin, InputNumber, Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import utils from "../utils";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const NewProduct = () => {
  const [preview, setPreview] = useState({
    visible: false,
    image: "",
    title: "",
  });

  const [fileList, setFileState] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Form
      layout="vertical"
      onFinish={(values) => utils.addProduct(values, fileList)}
    >
      <Form.Item
        label="Product Name"
        name="pname"
        rules={[
          {
            required: true,
            message: "Please input product name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: "Please input product description!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price ₹"
        name="price"
        type="number"
        rules={[{ required: true, message: "Please enter amount!" }]}
      >
        <InputNumber step={0.5} />
      </Form.Item>
      <br />
      <Form.Item
        label="Images"
        name="img"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          maxCount={1}
          listType="picture-card"
          fileList={fileList}
          onPreview={async (file) => {
            if (!file.url && !file.preview) {
              file.preview = await getBase64(file.originFileObj);
            }

            setPreview({
              image: file.url || file.preview,
              visible: true,
              title:
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
            });
          }}
          onChange={({ fileList }) => setFileState(fileList)}
          beforeUpload={() => false}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={preview.visible}
          title={preview.title}
          footer={null}
          onCancel={() =>
            setPreview({
              ...preview,
              visible: false,
            })
          }
        >
          <img alt="p" style={{ width: "100%" }} src={preview.image} />
        </Modal>
      </Form.Item>
      <Form.Item>
        {!loading ? (
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        ) : (
          <Spin />
        )}
      </Form.Item>
    </Form>
  );
};

export default NewProduct;
