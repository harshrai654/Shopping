import {
  Form,
  Input,
  Spin,
  InputNumber,
  Upload,
  Modal,
  Button,
  Alert,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import utils from "../utils";

const { Option } = Select;
const catCode = {
  lap: "Laptops",
  mob: "Mobiles",
};

const getStatusComponent = (status) => {
  switch (status) {
    case -1:
      return (
        <Button type="primary" htmlType="submit">
          Add Product
        </Button>
      );
    case 0:
      return <Spin />;
    case 1:
      return <Alert message="Something went wrong!" type="error" />;
    case 2:
      return <Alert message="Product Added successfully!" type="success" />;
    default:
      return <Spin />;
  }
};

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
  const [status, setStatus] = useState(-1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    utils
      .getCategories()
      .then((res) => setCategories(res.data.cats))
      .catch((err) => setCategories([]));
  });

  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
        setStatus(0);
        utils.addProduct(values, fileList).then((res) => {
          setStatus(1);
          if (res.status === 200) {
            setStatus(2);
          }
        });
      }}
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
        name="category"
        label="Category"
        hasFeedback
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select Product Category">
          {categories.map((cat) => (
            <Option value={cat}>{catCode[cat]}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Price ₹"
        name="price"
        type="number"
        rules={[{ required: true, message: "Please enter amount!" }]}
      >
        <InputNumber min={0} step={0.5} />
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
        type="number"
        rules={[{ required: true, message: "Please enter quantity!" }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <br />
      <Form.Item
        label="Images"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
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
          onChange={({ fileList }) => {
            console.log(fileList);
            setFileState(fileList);
          }}
          beforeUpload={() => false}
        >
          {fileList.length >= 8 || !status ? null : uploadButton}
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
      <Form.Item>{getStatusComponent(status)}</Form.Item>
    </Form>
  );
};

export default NewProduct;
