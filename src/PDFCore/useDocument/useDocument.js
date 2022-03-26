import { useState, useEffect } from 'react';
import getDocumentPages from './getDocumentPages';

const useDocument = ({ url, scale }) => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getPages = async () => {
      setLoading(true);
      const pages = await getDocumentPages({ url, scale });
      setPages(pages);
      setLoading(false);
    };

    getPages();
  }, [url, scale]);

  return {
    loading,
    pages,
  };
};

export default useDocument;
