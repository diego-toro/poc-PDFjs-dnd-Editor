import SideBarFields from './SideBarFields';
import { useDocument } from '../PDFCore';
import DropPdfVisualizer from './DropPdfVisualizer';
import PlaygroundContainer from './PlaygroundContainer';
import { useState } from 'react';

const DEFAULT_FIELDS = {
  hourly: [
    {
      id: '001',
      data: 'user.first_name',
    },
    {
      id: '002',
      data: 'user.last_name',
    },
  ],
  docusign: [
    {
      id: '101',
      data: 'signature',
    },
  ],
};

function PDFEditor({ url }) {
  const { pages, loading } = useDocument({ url });
  const [fieldsByPages, setFieldsByPages] = useState({});

  const handleDropField = (field) => {
    setFieldsByPages((currentFields) => ({
      ...currentFields,
      [field.page]: {
        ...(currentFields[field.page] ?? {}),
        [field._id]: field,
      },
    }));
  };

  return (
    <PlaygroundContainer>
      <SideBarFields
        fieldGroups={DEFAULT_FIELDS}
        fieldsByPages={fieldsByPages}
      />
      <DropPdfVisualizer
        pages={pages}
        fieldsByPages={fieldsByPages}
        loading={loading}
        onDropField={handleDropField}
      />
    </PlaygroundContainer>
  );
}

export default PDFEditor;
