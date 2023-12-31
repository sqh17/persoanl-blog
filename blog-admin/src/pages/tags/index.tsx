import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Modal,
  Form,
  Message,
  Popconfirm,
  Switch,
  Tooltip,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import { IconCheck, IconClose } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, create, update, remove, updateStatus } from '../../api/tags';
import { EditableCell, EditableRow } from './edit';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function Tags() {
  const locale = useLocale();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('添加标签');

  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record: any) => {
        return (
          <Tooltip content="启用状态下禁止右侧操作">
            <Switch
              checkedIcon={<IconCheck />}
              uncheckedIcon={<IconClose />}
              checked={record.status}
              onChange={(checked) => onStatusChange(checked, record)}
            />
          </Tooltip>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        return record.createTime
          ? dayjs(new Date(record.createTime)).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (_, record) => {
        return record.updateTime
          ? dayjs(new Date(record.updateTime)).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },

    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button
            disabled={record.status}
            onClick={() => onUpdate(record)}
            type="text"
            size="small"
          >
            {locale['searchTable.columns.operations.update']}
          </Button>
          <Popconfirm
            disabled={record.status}
            title="Are you sure you want to delete?"
            onOk={() => onDelete(record)}
          >
            <Button disabled={record.status} type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const categoriesState = useSelector((state: ReducerState) => state.categories);

  const { data, pagination, loading, formParams, visible, confirmLoading } = categoriesState;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        page: current,
        pageSize,
        ...params,
      };
      const res: any = await getList(postData);
      if (res.code === 0) {
        dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: { pagination: { ...pagination, current, pageSize, total: res.data.totalCount } },
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (error) {}
  }

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  function onSearch(name) {
    fetchData(1, pagination.pageSize, { name });
  }

  const onStatusChange = async (status: boolean, row) => {
    const res: any = await updateStatus({ id: row._id, status });
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('修改失败，请重试！');
    }
  };
  const onAdd = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
  };
  const onCancel = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: false,
      },
    });
    form.resetFields();
  };
  const onOk = async () => {
    await form.validate();
    const data = form.getFields();
    let func = create;
    if (data._id) {
      func = update;
    }
    dispatch({
      type: TOGGLE_CONFIRM_LOADING,
      payload: {
        confirmLoading: true,
      },
    });
    const res: any = await func(data);
    if (res.code === 0) {
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: {
          confirmLoading: false,
        },
      });
      onCancel();
      fetchData();
      Message.success(res.msg);
    } else {
      Message.success('添加失败，请重试！');
    }
  };

  const onHandleSave = async (row) => {
    const res: any = await update(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('修改失败，请重试！');
    }
  };
  const onUpdate = (row) => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
    form.setFieldsValue(row);
    setTitle('修改标签');
  };

  const onDelete = async (row) => {
    const res: any = await remove(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('删除失败，请重试！');
    }
  };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>标签管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button onClick={onAdd} type="primary">
              添加标签
            </Button>
          </div>
          <div>
            {/* <DatePicker.RangePicker style={{ marginRight: 8 }} onChange={onDateChange} /> */}
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入标签名称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns.map((column) =>
            column.editable
              ? {
                  ...column,
                  onCell: () => ({
                    onHandleSave,
                  }),
                }
              : column
          )}
          data={data}
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          className={styles['table-demo-editable-cell']}
        />

        <Modal
          title={<div style={{ textAlign: 'left' }}> {title} </div>}
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form {...formItemLayout} form={form}>
            <FormItem
              label="标签名称"
              field="name"
              rules={[{ required: true, message: '请输入标签名称' }]}
            >
              <Input placeholder="请输入标签名称" />
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default Tags;
