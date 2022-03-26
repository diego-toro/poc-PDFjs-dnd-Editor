import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './FieldBox.module.scss';

const FieldBox = forwardRef(({ label, className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.box, className)} {...props}>
    {label}
  </div>
));

export default FieldBox;
