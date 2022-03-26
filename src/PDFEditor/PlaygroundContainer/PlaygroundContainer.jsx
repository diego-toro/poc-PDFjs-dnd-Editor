import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CustomDragLayer from './CustomDragLayer';
import styles from './PlaygroundContainer.module.scss';

const PlaygroundContainer = ({ children }) => (
  <DndProvider backend={HTML5Backend}>
    <div className={styles.playground}>{children}</div>
    <CustomDragLayer />
  </DndProvider>
);

export default PlaygroundContainer;
