import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Header {
  key: string;
  label: string;
  column?: boolean;
  field?: boolean;
  required?: boolean;
}

interface TableHeaderProps {
  headers: Header[];
  sortBy: string;
  sortDesc: boolean;
  handleSort: Function;
}

export default function TableHeader({ headers, sortBy, sortDesc, handleSort }: TableHeaderProps) {
  const gridColumns = `grid-cols-${headers.length + 1}`;

  return (
    <div>
      <div className="hidden md:grid grid-cols-1 px-4 py-2 mx-4 my-2 bg-white rounded shadow-md font-bold">
        <div className={`grid ${gridColumns} items-center`}>
          {headers.map((header) => (
            <div key={header.key} onClick={() => handleSort(header.key, sortDesc)} className="flex items-center cursor-pointer">
              <span className="text-start text-base mr-2">
                {header.label}
              </span>
              {sortBy === header.key ? (
                sortDesc ? (
                  <ChevronDownIcon className="h-8 w-8 text-blue-500" />
                ) : (
                  <ChevronUpIcon className="h-8 w-8 text-blue-500" />
                )
              ) : (
                <ChevronUpIcon className="h-8 w-8 text-gray-200" />
              )}
            </div>
          ))}
          <div className="flex justify-center text-base mx-4">Ações</div>
        </div>
      </div>

      <div className="md:hidden p-2 mx-4 my-2 bg-white rounded shadow-md">
        <div className="flex justify-between items-center">
          <select
            className="px-4 py-2 w-full mr-2 border border-gray-300 rounded"
            onChange={(e) => handleSort(e.target.value, sortDesc)}
            value={sortBy}
          >
            {headers.map((header) => (
              <option key={header.key} value={header.key}>
                {header.label}
              </option>
            ))}
          </select>
          <button onClick={() => handleSort(sortBy, !sortDesc)}>
            {sortDesc ? (
              <ChevronDownIcon className="h-8 w-8 text-blue-500" />
            ) : (
              <ChevronUpIcon className="h-8 w-8 text-blue-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
