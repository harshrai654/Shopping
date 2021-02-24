import { useState } from "react";
import { Form, Input, Button, Modal, InputNumber, Spin, Alert } from "antd";
import utils from "../utils";

const UpdateProductForm = (props) => {
  const { product, tokenData } = props;
  const [loading, setLoading] = useState(-1);
  return (
    <>
      {loading === 1 && (
        <Alert
          message="Product added successfully"
          type="success"
          closable
          onClose={() => setLoading(-1)}
        />
      )}
      {loading === 2 && (
        <Alert
          message="Something went wrong!"
          type="error"
          closable
          onClose={() => setLoading(-1)}
        />
      )}
      <Form
        initialValues={product}
        onFinish={(pro) => {
          pro = { ...pro, _id: product._id };
          setLoading(0);
          utils
            .updateProduct(pro, tokenData)
            .then((res) => {
              if (res.status === 403) {
                setLoading(2);
              } else {
                props.setProduct(res.data.product);
                setLoading(1);
              }
            })
            .catch((err) => {
              console.error(err);
              setLoading(2);
            });
        }}
      >
        <Form.Item label="Product name" name="pname">
          <Input
            defaultValue={product.pname}
            rules={[
              {
                required: true,
                message: "Product name cannot be empty!",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Description" name="desc">
          <Input
            defaultValue={product.desc}
            rules={[
              {
                required: true,
                message: "Product description cannot be empty!",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Price ₹" name="price" type="number">
          <InputNumber
            min={0}
            step={0.5}
            defaultValue={product.price}
            rules={[
              {
                required: true,
                message: "Please enter product price",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" type="number">
          <InputNumber
            min={0}
            defaultValue={product.quantity}
            rules={[
              {
                required: true,
                message: "Please enter product quantity",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          {loading && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
          {!loading && <Spin />}
        </Form.Item>

        {/* <Form.Item
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
                  file.name ||
                  file.url.substring(file.url.lastIndexOf("/") + 1),
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
        </Form.Item> */}
      </Form>
    </>
  );
};

export default UpdateProductForm;
