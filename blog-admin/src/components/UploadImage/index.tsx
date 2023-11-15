import React, { useEffect, useState } from 'react';
// import { Button } from '@arco-design/web-react';
// import { IconPlus } from '@arco-design/web-react/icon';
import Item from './item';

// import styles from './item.module.less';

interface Iimage {
  _id?: string;
  imgUrl?: string;
  link?: string;
  icon?: string;
  showAdd?: boolean;
  showReduce?: boolean;
}
const UploadImage = (props) => {
  const {
    value,
    onChange,
    max,
    showImg = true,
    showLink = true,
    showIcon = false,
    showAction = true,
  } = props;

  const initImgs: Array<Iimage> = [
    {
      _id: '',
      imgUrl: '',
      link: '',
      icon: '',
    },
  ];

  const [imgsArr, setImgsArr] = useState(() => {
    return value || initImgs;
  });

  useEffect(() => {
    // 处理空数组的情况
    if (!value || value.length === 0) {
      setImgsArr(initImgs);
    } else {
      const length = value.length;
      value.map((item, idx) => {
        if (length < max) {
          // 1 < 3
          item.showReduce = length !== 1;
          item.showAdd = length - 1 === idx;
        } else {
          item.showReduce = true; // 可以删除
          item.showAdd = false;
        }
      });
      setImgsArr(value);
    }
  }, [value]);

  const onItemChange = (data) => {
    console.log(data);
    imgsArr.forEach((item, index) => {
      if (index === data.index) {
        item[data.field] = data.value;
      }
    });
    onChange(imgsArr);
  };

  const onAdd = () => {
    if (imgsArr.length < max) {
      imgsArr.push({
        imgUrl: '',
        link: '',
        icon: '',
      });
      console.log(imgsArr);

      onChange(imgsArr);
    }
  };
  const onRemove = (index) => {
    if (imgsArr.length > 1) {
      imgsArr.splice(index, 1);
      onChange(imgsArr);
    }
  };
  return (
    <>
      {imgsArr?.map((item, index) => {
        return (
          <Item
            key={index}
            {...item}
            index={index}
            onChange={onItemChange}
            onAdd={onAdd}
            onRemove={onRemove}
            showImg={showImg}
            showLink={showLink}
            showIcon={showIcon}
            showAction={showAction}
          />
        );
      })}
      {/* {imgsArr.length < 3 && (
        <div className={styles['add-btn-wrapper']}>
          <Button
            icon={<IconPlus />}
            type="primary"
            className={(styles.btn, styles.addBtn)}
            onClick={onAdd}
          >
            添加
          </Button>
        </div>
      )} */}
    </>
  );
};

export default UploadImage;
