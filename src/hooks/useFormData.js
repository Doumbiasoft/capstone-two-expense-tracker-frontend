
import { useState } from 'react';

export const useFormData = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleChangeFormData = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle different types of form fields
    setFormData((data) => {
      if (type === 'checkbox') {
        // For checkboxes, set the value and checked state
        return { ...data, [name]: { value, checked } };
      } else {
        // For other field types, set the value normally
        return { ...data, [name]: value };
      }
    });
  };

  return [formData, setFormData, handleChangeFormData];
};
