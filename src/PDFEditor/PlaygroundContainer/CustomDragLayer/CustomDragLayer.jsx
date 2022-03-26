import { memo } from 'react';
import { useDragDropManager, useDragLayer } from 'react-dnd';
import FieldBox from '../../FieldBox';
import styles from './CustomDragLayer.module.scss';

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const BoxDragPreview = memo(({ item, isDroppable }) => (
  <FieldBox
    label={item.data}
    style={{ backgroundColor: isDroppable ? 'green' : 'red' }}
  />
));

const CustomDragLayer = () => {
  const manager = useDragDropManager();

  const { isDragging, item, initialOffset, currentOffset, isOverTarget } =
    useDragLayer((monitor) => {
      return {
        item: monitor.getItem(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        isOverTarget: (() => {
          const _monitor = manager.getMonitor();
          const targetIds = _monitor.getTargetIds() || [];

          for (let i = targetIds.length - 1; i >= 0; i--) {
            return _monitor.isOverTarget(targetIds[i]);
          }

          return false;
        })(),
      };
    });

  function renderItem() {
    return <BoxDragPreview item={item} isDroppable={isOverTarget} />;
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div className={styles.layer}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};

export default CustomDragLayer;
