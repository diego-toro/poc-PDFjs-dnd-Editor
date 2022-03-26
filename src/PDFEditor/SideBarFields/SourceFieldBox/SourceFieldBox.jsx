import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import FieldBox from '../../FieldBox';
import { ItemTypes } from '../../ItemTypes';
import { getEmptyImage } from 'react-dnd-html5-backend';

const SourceFieldBox = ({ field, className }) => {
  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: ItemTypes.SOURCE_FIELD,
    item: field,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []); // eslint-disable-line

  return (
    <FieldBox
      ref={dragRef}
      className={className}
      style={{ opacity }}
      label={field.data}
    />
  );
};

export default SourceFieldBox;
