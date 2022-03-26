import pdfURL from './w9_form.pdf';
import { PDFVisualizer } from './PDFCore';
import PDFEditor from './PDFEditor';
import { useState } from 'react';

const VISUAL_OPTIONS = {
  SIMPLE: 'simple',
  DRAGGABLE: 'draggable',
};

const VISUAL_COMPONENTS = {
  [VISUAL_OPTIONS.SIMPLE]: PDFVisualizer,
  [VISUAL_OPTIONS.DRAGGABLE]: PDFEditor,
};

// https://checkapp.atlassian.net/browse/API-2251

function App() {
  const [mode, setMode] = useState(VISUAL_OPTIONS.SIMPLE);

  const Visualizer = VISUAL_COMPONENTS[mode];

  return (
    <>
      <header>
        <h1>PDF JS - Proof</h1>
        <button
          onClick={() => setMode(VISUAL_OPTIONS.SIMPLE)}
          disabled={mode === VISUAL_OPTIONS.SIMPLE}
        >
          Simple
        </button>
        <button
          onClick={() => setMode(VISUAL_OPTIONS.DRAGGABLE)}
          disabled={mode === VISUAL_OPTIONS.DRAGGABLE}
        >
          with Drag Fields
        </button>
      </header>

      <Visualizer url={pdfURL} />
    </>
  );
}

export default App;
