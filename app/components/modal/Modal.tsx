import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Form from './Form';

interface Field {
  key: string;
  label: string;
  column?: boolean;
  field?: boolean;
  required?: boolean;
  type: string;
  content?: string | number | File | null;
}

interface ModalProps {
  isOpenModal: boolean;
  fields: Field[];
  formErrors: string[];
  modalOperation: 'createItem' | 'editItem' | 'deleteItem';
  handleModalOperation: () => void;
  handleOpenModal: (operation: 'createItem' | 'editItem' | 'deleteItem') => void;
  closeModal: () => void;
  updateFieldContent: (key: string, content: string | number | File  | null) => void;
}

export default function Modal({
  isOpenModal,
  fields,
  formErrors,
  modalOperation,
  handleModalOperation,
  handleOpenModal,
  closeModal,
  updateFieldContent,
}: ModalProps) {
  const modalOperations = {
    createItem: {
      title: 'Novo item',
      buttonLabel: 'Salvar',
    },
    editItem: {
      title: 'Editar item',
      buttonLabel: 'Editar',
    },
    deleteItem: {
      title: 'Deletar item?',
      buttonLabel: 'Confirmar',
    },
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-2">
        <button
          onClick={() => handleOpenModal('createItem')}
          className="flex justify-center items-center px-4 py-2 my-4 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          <span className='text-base font-bold mr-2'>Novo item</span>
          <PlusIcon className="w-5 h-5 text-white" />
        </button>
      </div>
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-base overflow-auto bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-4 mx-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-lg font-medium">{modalOperations[modalOperation].title}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                X
              </button>
            </div>
            {modalOperation !== 'deleteItem' && (
              <div>
                <Form fields={fields} formErrors={formErrors} updateFieldContent={updateFieldContent} />
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleModalOperation}
                className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                {modalOperations[modalOperation].buttonLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
