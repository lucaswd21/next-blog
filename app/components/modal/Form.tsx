import React from 'react';
import FormField from './FormField';

interface Field {
  key: string;
  label: string;
  column?: boolean;
  field?: boolean;
  required?: boolean;
  type: string;
  content?: string | number | File | null;
}

interface FormProps {
  fields: Field[];
  formErrors: string[];
  updateFieldContent: (key: string, content: string | number | File) => void;
}

export default function Form({ fields, formErrors, updateFieldContent }: FormProps) {
  return (
    <div>
      {fields.map((field) =>
        field.field ? (
          <FormField key={field.key} field={field} hasError={formErrors.includes(field.key)} updateFieldContent={updateFieldContent} />
        ) : null
      )}
      <p>Campos com * são obrigatórios</p>
    </div>
  );
}
