import { useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { DocumentPage } from '../../../PDFCore';
import InteractiveFieldBox from '../InteractiveFieldBox';
import { ItemTypes } from '../../ItemTypes';

const DropPage = ({ src, width, height, page, fields, onDropField }) => {
  const moveBox = useCallback(
    (item, left, top) => {
      onDropField({
        ...item,
        _id: item._id ?? `00${page}${Object.keys(fields).length}`,
        page,
        top,
        left,
      });
    },
    [onDropField, page, fields]
  );

  const ref = useRef();

  const [, dropRef] = useDrop(
    () => ({
      accept: [ItemTypes.SOURCE_FIELD, ItemTypes.FIELD],
      drop(item, monitor) {
        const pageRect = ref.current.getBoundingClientRect();

        const sourcePosition = monitor.getInitialSourceClientOffset();

        const clickOffset = monitor.getInitialClientOffset();

        const releaseDifference = monitor.getDifferenceFromInitialOffset();

        const clickRelativeToItem = clickOffset.y - sourcePosition.y;
        const deltaTotalTop = clickOffset.y + releaseDifference.y;
        const topRelativeToPage = deltaTotalTop - pageRect.y;

        const clickRelativeToItemX = clickOffset.x - sourcePosition.x;
        const deltaTotalLeft = clickOffset.x + releaseDifference.x;
        const leftRelativeToPage = deltaTotalLeft - pageRect.x;

        const top = topRelativeToPage - clickRelativeToItem;
        const left = leftRelativeToPage - clickRelativeToItemX;

        moveBox(item, left, top);

        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <DocumentPage ref={dropRef(ref)} src={src} width={width} height={height}>
      {Object.values(fields).map((field) => (
        <InteractiveFieldBox key={field._id} field={field} />
      ))}
    </DocumentPage>
  );
};

export default DropPage;
