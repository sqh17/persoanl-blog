import React, { useState, useEffect } from 'react';
import { Tag, Input, Message } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { TweenOneGroup } from 'rc-tween-one';
import { randomColor } from '../../../utils/utils';
import styles from '../style/index.module.less';

const Tags = (props) => {
  const [tags, setTags] = useState(props.value || []);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const init = (arr) => {
    const newArr = arr?.map((item) => {
      return {
        name: item,
        color: randomColor(),
      };
    });
    setTags(newArr || []);
  };
  useEffect(() => {
    init(props.value);
  }, [props.value === undefined]);

  type ItemType = {
    name: string;
    color: string;
  };
  function addTag() {
    const removeRepeat = (arr) => {
      const map: Map<string, ItemType> = new Map();
      for (const item of arr) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        }
      }
      return [...map.values()];
    };

    if (inputValue) {
      // if (tags.some((it) => it.name === inputValue)) {
      //   Message.error('标签重复');
      //   return;
      // }
      let newTags = tags;
      tags.push({
        name: inputValue,
        color: randomColor(),
      });
      newTags = removeRepeat(newTags);

      setTags(newTags);
      setInputValue('');
      props.onChange && props.onChange(newTags.map((item) => item.name));
    }
    setShowInput(false);
  }

  function removeTag(removeTag) {
    const newTags = tags.filter((tag) => {
      if (tag.name !== removeTag) {
        return tag;
      }
    });
    setTags(newTags);
    props.onChange && props.onChange(newTags.map((item) => item.name));
  }

  const handleAdd = () => {
    if (tags && tags.length !== 0) {
      if (props.max && tags.length < props.max) {
        setShowInput(true);
      } else {
        Message.info(`标签个数不能超过${props.max}个`);
      }
    } else {
      setShowInput(true);
    }
  };

  const tagChild = tags?.map((tag) => {
    const tagElem = (
      <Tag
        closable
        color={tag.color}
        onClose={() => removeTag(tag.name)}
        style={{ marginRight: 10, marginBottom: 10 }}
      >
        {tag.name}
      </Tag>
    );

    return (
      <div className={styles['tags-item']} key={tag.name}>
        {tagElem}
      </div>
    );
  });

  return (
    <div>
      <TweenOneGroup
        enter={{
          scale: 0.8,
          opacity: 0,
          type: 'from',
          duration: 100,
        }}
        leave={{
          opacity: 0,
          width: 0,
          scale: 0,
          duration: 200,
        }}
        appear={false}
      >
        {tagChild}
      </TweenOneGroup>

      {showInput ? (
        <Input
          autoFocus
          size="mini"
          value={inputValue}
          style={{ width: 84 }}
          onPressEnter={addTag}
          onBlur={addTag}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          style={{
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
          }}
          onClick={handleAdd}
        >
          添加
        </Tag>
      )}
    </div>
  );
};

export default Tags;
