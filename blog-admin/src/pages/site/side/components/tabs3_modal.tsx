import React, { useImperativeHandle, forwardRef } from 'react';
import { Input, Modal, Form, Select, Radio } from '@arco-design/web-react';
import { projects, showPositions } from '../../../../const';
import UploadImage from '../../../../components/UploadImage';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
function TabModal(props, ref) {
  const [form] = Form.useForm();
  const { onOk, onCancel, visible, title, confirmLoading } = props;
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
    <Modal
      title={<div style={{ textAlign: 'left' }}> {title} </div>}
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item
          label="推荐项目"
          field="project"
          rules={[{ required: true, message: '请选择推荐项目' }]}
        >
          <Select placeholder="请选择推荐项目">
            {projects.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="名称" field="name" rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item
          label="展示位置"
          field="showPosition"
          rules={[{ required: true, message: '请选择展示位置' }]}
        >
          <Select mode="multiple" placeholder="请选择展示位置">
            {showPositions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="平台"
          field="platform"
          rules={[{ required: true, message: '请输入平台' }]}
        >
          <Input placeholder="请输入平台" />
        </Form.Item>

        <Form.Item label="是否需要VIP" field="isVip">
          <Radio.Group>
            <Radio value>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="封面/链接"
          field="imgs"
          rules={[{ required: true, message: '请上传封面/链接' }]}
        >
          <UploadImage />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default forwardRef(TabModal);
