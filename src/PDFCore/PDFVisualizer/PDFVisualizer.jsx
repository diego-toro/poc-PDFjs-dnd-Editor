import DocumentPage from '../DocumentPage';
import useDocument from '../useDocument';
import styles from './PDFVisualizer.module.scss';

function PDFVisualizer({ url }) {
  const { pages, loading } = useDocument({ url });

  if (loading) {
    return 'LOADING...';
  }

  return (
    <div className={styles.documentWrapper}>
      {pages.map(({ dataUrl, width, height }, i) => (
        <DocumentPage src={dataUrl} width={width} height={height} key={i} />
      ))}
    </div>
  );
}

export default PDFVisualizer;
