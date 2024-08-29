import TableItem from './TableItem';

interface Header {
  key: string;
  label: string;
  column?: boolean;
  field?: boolean;
  required?: boolean;
}

interface TableListProps {
  headers: Header[];
  list: Record<string, any>[];
  search: string;
  handleOpenModal: (operation: string, item?: Record<string, any>) => void;
}

export default function TableList({ headers, list, search, handleOpenModal }: TableListProps) {
  return (
    <div>
      {
        list.length ?(
          list.map((item, index) => (
              <TableItem
                key={index}
                headers={headers}
                item={item}
                handleOpenModal={handleOpenModal}
              />
            )
          )) : (
            <h1 className="text-lg font-semibold text-center text-gray-700 my-4">
                {
                    search.length ?
                      `Sua busca por "${search}" não obteve resultados` :
                      'Ainda não há posts'
                }
            </h1>
        )
      }
    </div>
  );
}
