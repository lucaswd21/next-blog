interface TableFooterProps {
  actualPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export default function TableFooter({
  actualPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}: TableFooterProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex flex-col md:flex-row bottom-0 left-0 w-full items-center justify-between p-4 space-y-2 md:space-y-0 bg-white rounded shadow-md">
      <span className="text-sm text-gray-600 mx-2">
        Mostrando {(actualPage - 1) * itemsPerPage + 1} a {Math.min(actualPage * itemsPerPage, totalItems)} de {totalItems} resultados
      </span>
      <div className="flex space-x-2">
        <button
          disabled={actualPage === 1}
          onClick={() => onPageChange(actualPage - 1)}
          className={`px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white ${actualPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Anterior
        </button>
        <span className="mx-4 my-2">{actualPage} - {totalPages}</span>
        <button
          disabled={actualPage === totalPages}
          onClick={() => onPageChange(actualPage + 1)}
          className={`px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white ${actualPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Próximo
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>
    </div>
  );
}
