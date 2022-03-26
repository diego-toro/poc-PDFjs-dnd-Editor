import * as PDFJS from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

PDFJS.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;

const getDocumentPages = async ({ scale = 1, url }) => {
  const loadingTask = PDFJS.getDocument(url);
  const pdf = await loadingTask.promise;

  const { numPages } = pdf;

  const pageData = [];

  var outputScale = window.devicePixelRatio || 1;

  for (let i = 0; i < numPages; i++) {
    const page = await pdf.getPage(i + 1);

    const viewport = page.getViewport({ scale });
    const { width, height } = viewport;

    const canvas = document.createElement('canvas');

    canvas.width = Math.floor(width * outputScale);
    canvas.height = Math.floor(height * outputScale);

    const transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    await page.render({
      canvasContext: canvas.getContext('2d'),
      transform,
      viewport,
    }).promise;

    pageData.push({ dataUrl: canvas.toDataURL('image/png'), width, height });
  }

  return pageData;
};

export default getDocumentPages;
