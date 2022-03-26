import { Fragment } from 'react';
import styles from './SideBarFields.module.scss';
import SourceFieldBox from './SourceFieldBox';

const SideBarFields = ({ fieldGroups, fieldsByPages }) => (
  <div className={styles.fieldsWrapper}>
    <div className={styles.fields}>
      {Object.entries(fieldGroups).map(([key, value]) => (
        <Fragment key={key}>
          <h3>{key}</h3>
          {value.map((field) => (
            <SourceFieldBox key={field.id} field={field} />
          ))}
        </Fragment>
      ))}
    </div>
    <div className={styles.payloadWrapper}>
      <h3>Payload</h3>
      <div className={styles.payload}>
        <pre>{JSON.stringify(fieldsByPages, null, 2)}</pre>
      </div>
    </div>
  </div>
);

export default SideBarFields;
