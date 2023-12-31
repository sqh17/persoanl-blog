import React, { useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Message,
  Popconfirm,
  Image,
  Tag,
  Tooltip,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, remove } from '../../api/user';

function Categories() {
  const dispatch = useDispatch();
  const css: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '200px',
  };
  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickName',
      width: 160,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 60,
      render: (_, record) => {
        return <Image width={50} height={50} src={record.avatar} />;
      },
    },
    {
      title: '来源',
      width: 90,
      dataIndex: 'provider',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: '收藏数量',
      dataIndex: 'articleIds',
      render: (_, record) => {
        return <Tag color="orange">{record.articleIds?.length}</Tag>;
      },
    },

    {
      title: '简介',
      dataIndex: 'introduction',
      render: (text) => {
        return (
          <Tooltip position="tl" content={text}>
            <p style={css}>{text}</p>
          </Tooltip>
        );
      },
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      width: 180,
      render: (record) => {
        return record.registerTime
          ? dayjs(new Date(record.registerTime)).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },

    {
      title: '操作',
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Popconfirm title="Are you sure you want to delete?" onOk={() => onDelete(record)}>
            <Button type="text" status="danger" size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const userState = useSelector((state: ReducerState) => state.user);

  const { data, pagination, loading, formParams } = userState;

  useEffect(() => {
    fetchData();
  }, []);
  // interface ListResponse {
  //   list?: unknown[];
  //   totalCount?: number;
  // }
  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        page: current,
        pageSize,
        ...params,
      };
      const res: any = await getList(postData);
      if (res) {
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

  function onSearch(nickName) {
    fetchData(1, pagination.pageSize, { nickName });
  }

  async function onDelete(row) {
    const res: any = await remove(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('删除失败，请重试！');
    }
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 12 }}>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入昵称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default Categories;
