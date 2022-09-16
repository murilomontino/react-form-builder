/**
  * <ToolbarItem />
  */

import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import ID from './UUID';

const cardSource = {
  beginDrag(props) {
    return {
      id: ID.uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate,
    };
  },
};

class ToolbarItem extends React.Component {
  render() {
    const { connectDragSource, data, onClick } = this.props;
    if (!connectDragSource) return null;
    return (
      connectDragSource(
        <li onClick={onClick}
          style={{
            cursor: 'pointer',
            width: '120px',
          }}
        className="
        card
        justify-content-center
        align-items-center
        d-flex
        flex-column
        p-2
        m-1
        rounded
        "><i className={data.icon}></i>{data.name}</li>,
      )
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(ToolbarItem);
