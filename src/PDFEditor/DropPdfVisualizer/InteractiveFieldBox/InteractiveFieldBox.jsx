import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import FieldBox from '../../FieldBox';
import { ItemTypes } from '../../ItemTypes';
import styles from './InteractiveFieldBox.module.scss';

const InteractiveFieldBox = ({ field }) => {
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.FIELD,
      item: field,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [field]
  );
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []); // eslint-disable-line

  const opacity = isDragging ? 0.4 : 1;

  return (
    <FieldBox
      ref={dragRef}
      className={styles.box}
      style={{ opacity, top: field.top, left: field.left }}
      label={field.data}
    />
  );
};

export default InteractiveFieldBox;
