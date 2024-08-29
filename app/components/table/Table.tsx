import { useState, useMemo, ElementType } from 'react';
import TableHeader from './TableHeader';
import TableList from './TableList';
import TableFooter from './TableFooter';
import Modal from '../modal/Modal';
import Notification from '../Notification';
import SearchBar from '../SearchBar';

interface Post {
    id: number;
    title: string;
    text: string;
    thumbnail: string;
    url: string;
    created_at: string;
}

type ModalOperation = keyof CrudMethods;

interface CrudMethods {
    createItem: (item: Omit<Post, 'id' | 'created_at'>) => void;
    editItem: (item: Post) => void;
    deleteItem: (item: Post) => void;
  }

interface Header {
    key: string;
    label: string;
    column?: boolean;
    field?: boolean;
    required?: boolean;
    type: string;
    content?: string | number | File | null;
}

interface TableProps {
    tableIcon: ElementType;
    tableTitle: string;
    crudMethods: CrudMethods;
    list: Array<Record<string, any>>;
    headers: Header[];
    sortByDefault: string;
    sortDescDefault: boolean;
}

export default function Table({
    tableTitle,
    tableIcon: TableIcon,
    crudMethods,
    list,
    headers,
    sortByDefault,
    sortDescDefault
}: TableProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [modalOperation, setModalOperation] = useState<ModalOperation>('createItem');
    const [fields, setFields] = useState<Header[]>(headers);
    const [actualPage, setActualPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const tableHeaders = headers.filter((header) => header.column);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState(sortByDefault)
    const [sortDesc, setSortDesc] = useState(sortDescDefault)
    const [formErrors, setFormErrors] = useState<string[]>([])
    const [notificationColor, setNoticationColor] = useState('')
    const [notificationMessage, setNotificationMessage] = useState('')


    const showNotification = () => setIsOpenNotification(true);
    const hideNotification = () => setIsOpenNotification(false);

    const filteredList = () => {
        return list.filter((item) => {
            const columns = headers.filter(header => header.column).map(header => header.key);
            return columns.some(column =>
                item[column]?.toString().toLowerCase().includes(search.toLowerCase())
            );
        })
    }

    const sortedList = () => {
        return filteredList().sort((a, b) => {
          const aValue = a[sortBy];
          const bValue = b[sortBy];
      
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDesc ? bValue - aValue : aValue - bValue;
          } else if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDesc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
          } else {
            return 0;
          }
        });
      };
    
    const handleSort = (key: string, desc: boolean) => {
        setSortBy(key)
        setSortDesc(!desc)
    }

    const totalItems = filteredList().length;

    const currentItems = useMemo(() => {
      const start = (actualPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sortedList().slice(start, end);
    }, [actualPage, itemsPerPage, list, search, sortBy, sortDesc]);

    const updateFieldContent = (key: string, content: string | number | File | null) => {
        setFields(fields.map((field) =>
            field.key === key ? { ...field, content: content } : field
        ));
    };

    const handleOpenModal = (option: string, item?: Record<string, any>) => {
        setModalOperation(option as ModalOperation);
        setFields(fields.map((field) => ({ ...field, content: '' })));
        if (item) {
            setFields(fields.map((field) => ({
                ...field,
                content: item[field.key] || ''
            })));
        }
        openModal();
    };

    const handleModalOperation = () => {
        try {
            const item: Record<string, any> = {};
            const emptyRequiredFields = fields.filter((field) => field.required && !field.content)
            if (emptyRequiredFields.length) {
                setFormErrors(emptyRequiredFields.map((field) => field.key))
                setNoticationColor('bg-red-500')
                setNotificationMessage('Há campos obrigatórios não preenchidos')
                showNotification()
                return
            }
            fields.forEach((field) => {
                if (field.key) {
                    item[field.key] = field.content;
                }
            });
            crudMethods[modalOperation as ModalOperation](item as Post);
            setFields(fields.map((field) => ({ ...field, content: '' })));
            setFormErrors([])
            closeModal();
            setNoticationColor('bg-green-500')
            setNotificationMessage('Operação realizada com sucesso!')
            showNotification()
        } catch (error) {
            setNoticationColor('bg-red-500')
            setNotificationMessage('Ops, não foi possível concluir, tente novamente...')
            showNotification()
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between px-8 rounded shadow-md space-x-2 text-2xl font-semibold">
                <div className='flex'>
                    <TableIcon className="mt-1 mr-2 h-8 w-8 text-blue-500" />
                    <h1>{tableTitle}</h1>
                </div>
                <Modal
                    isOpenModal={isOpenModal}
                    modalOperation={modalOperation}
                    fields={fields}
                    formErrors={formErrors}
                    handleOpenModal={handleOpenModal}
                    closeModal={closeModal}
                    updateFieldContent={updateFieldContent}
                    handleModalOperation={handleModalOperation}
                />
                <Notification isOpen={isOpenNotification} message={notificationMessage} color={notificationColor} onClose={hideNotification} />
            </div>
            <div className="m-4">
                <SearchBar search={search} setSearch={setSearch}/>
                <TableHeader
                    headers={tableHeaders}
                    sortBy={sortBy}
                    sortDesc={sortDesc}
                    handleSort={handleSort}
                />
                <TableList headers={tableHeaders} list={currentItems} search={search} handleOpenModal={handleOpenModal} />
                <TableFooter
                    actualPage={actualPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onPageChange={setActualPage}
                    onItemsPerPageChange={(newItemsPerPage) => {
                        setItemsPerPage(newItemsPerPage);
                        setActualPage(1);
                    }}
                />
            </div>
        </div>
    );
}
