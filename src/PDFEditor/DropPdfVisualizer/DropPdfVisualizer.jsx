import DropPage from './DropPage';
import styles from './DropPdfVisualizer.module.scss';

function DropPdfVisualizer({ pages, fieldsByPages, loading, onDropField }) {
  if (loading) {
    return 'LOADING...';
  }

  return (
    <div className={styles.documentWrapper}>
      {pages.map(({ dataUrl, width, height }, page) => (
        <DropPage
          key={page}
          page={page}
          src={dataUrl}
          width={width}
          height={height}
          fields={fieldsByPages[page] ?? {}}
          onDropField={onDropField}
        />
      ))}
    </div>
  );
}

export default DropPdfVisualizer;
