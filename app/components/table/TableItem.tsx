import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Header {
  key: string;
  label: string;
  type?: string;
  column?: boolean;
  field?: boolean;
}

interface TableItemProps {
  headers: Header[];
  item: Record<string, any>;
  handleOpenModal: (operation: string, item: Record<string, any>) => void;
}

export default function TableItem({ headers, item, handleOpenModal }: TableItemProps) {
  const gridColumns = `grid grid-cols-1 md:grid-cols-${headers.length + 1} flex flex-grow`;

  function formatDate(date: string): string {
    const dateToFormat = new Date(date);
    
    const day = String(dateToFormat.getDate()).padStart(2, '0');
    const month = String(dateToFormat.getMonth() + 1).padStart(2, '0');
    const year = dateToFormat.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleValue = (header: Header, itemValue: any) => {
    return header.type === 'date' ? formatDate(itemValue) : itemValue;
  };

  return (
    <div className="p-2 mx-4 my-2 bg-white rounded shadow-md">
      <div className="grid grid-cols-1 md:flex md:items-center md:justify-between">
        <div className={gridColumns}>
          {headers.map((header) => (
            <div key={header.key} className="grid grid-cols-2 md:grid-cols-1 text-start text-base mx-4 my-2">
              <span className="font-bold block md:inline md:hidden">{header.label}:</span>
              <span className="block md:inline">{handleValue(header, item[header.key])}</span>
            </div>
          ))}
          <div className="flex justify-end space-x-2 mt-2 md:mt-0">
            <button
              className="p-2 text-white bg-gray-300 rounded hover:bg-blue-700"
              onClick={() => handleOpenModal('editItem', item)}
            >
              <PencilSquareIcon className="w-6 h-6 text-gray-700" />
            </button>
            <button
              className="p-2 text-white bg-gray-300 rounded hover:bg-blue-700"
              onClick={() => handleOpenModal('deleteItem', item)}
            >
              <TrashIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
