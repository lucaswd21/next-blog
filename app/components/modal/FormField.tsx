import React, { ChangeEvent } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';

interface Field {
  key: string;
  label: string;
  column?: boolean;
  field?: boolean;
  required?: boolean;
  type: string;
  content?: string | number | File | null;
}

interface FormFieldProps {
  field: Field;
  hasError: boolean;
  updateFieldContent: (key: string, content: string | number | File) => void;
}

export default function FormField({ field, hasError, updateFieldContent }: FormFieldProps) {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageFile = URL.createObjectURL(file);
      updateFieldContent(field.key, imageFile);
    }
  };

  const handleAddImage = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="p-2">
      <label className={hasError ? 'text-red-500' : ''}>{field.label}{field.required ? '*' : ''}:</label>
      {field.type === 'file' ? (
        <div className="flex justify-center items-center mt-2">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <button
            onClick={handleAddImage}
            className="flex justify-center items-center px-4 py-2 my-4 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            <CameraIcon className="w-5 h-5 text-white" />
          </button>
          {typeof field.content === 'string' && field.content && (
            <img
              src={field.content}
              alt="Post thumbnail"
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
            />
          )}
        </div>
      ) : (
        <input
          className={`w-80 p-2 m-4 text-gray-700 bg-white border ${hasError ? 'border-red-300' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type={field.type}
          onChange={(e) => updateFieldContent(field.key, e.target.value)}
          value={field.content as string | number}
        />
      )}
      { hasError &&
        (
          <p className='text-red-500 mt-1 mb-2 text-sm'>O campo {field.label} é obrigatório</p>
        )
      }
    </div>
  );
}
