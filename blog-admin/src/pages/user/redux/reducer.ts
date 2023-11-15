import { PaginationProps } from '@arco-design/web-react/es/Pagination/pagination';
import { UPDATE_LIST, UPDATE_LOADING, UPDATE_PAGINATION, UPDATE_FORM_PARAMS } from './actionTypes';

const initialState = {
  data: [],
  pagination: {
    sizeCanChange: true,
    showTotal: true,
    pageSize: 20,
    current: 1,
    pageSizeChangeResetCurrent: true,
  },
  loading: true,
  formParams: {},
};

interface FormParams {
  [key: string]: string;
}

export interface UserState {
  data?: any[];
  pagination?: PaginationProps;
  formParams?: FormParams;
  loading?: boolean;
}

export default function(state = initialState, action) {
  switch (action.type) {
    // 列表
    case UPDATE_LIST: {
      const { data } = action.payload;

      return {
        ...state,
        data,
      };
    }
    // loading
    case UPDATE_LOADING: {
      const { loading } = action.payload;
      return {
        ...state,
        loading,
      };
    }
    // 分页
    case UPDATE_PAGINATION: {
      const { pagination } = action.payload;
      return {
        ...state,
        pagination,
      };
    }
    // 参数
    case UPDATE_FORM_PARAMS: {
      const { params } = action.payload;
      return {
        ...state,
        formParams: params,
      };
    }

    default:
      return state;
  }
}
