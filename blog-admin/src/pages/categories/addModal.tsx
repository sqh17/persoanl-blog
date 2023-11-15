import React, { forwardRef, useImperativeHandle } from 'react';
import { Input, Modal, Form } from '@arco-design/web-react';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
function AddModal(props, ref) {
  const [form] = Form.useForm();
  const { visible, onOk, onCancel, confirmLoading, title } = props;
  useImperativeHandle(
    ref,
    () => {
      return {
        form,
      };
    },
    []
  );
  return (
    <div>
      <Modal
        title={<div style={{ textAlign: 'left' }}> {title} </div>}
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <Form {...formItemLayout} form={form}>
          <FormItem
            label="分类名称"
            field="name"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default forwardRef(AddModal);
