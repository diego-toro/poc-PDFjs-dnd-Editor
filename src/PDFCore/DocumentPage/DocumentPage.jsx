import { forwardRef } from 'react';
import styles from './DocumentPage.module.scss';

const DocumentPage = forwardRef(({ src, children, width, height }, ref) => (
  <div ref={ref} className={styles.page}>
    <img
      className={styles.image}
      src={src}
      alt=""
      draggable="false"
      width={width}
      height={height}
      onDragStart={(e) => e.preventDefault()}
    />
    {children}
  </div>
));

export default DocumentPage;
