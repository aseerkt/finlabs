import { FormContext, FormDispatchContext } from '@/contexts/FormContext';
import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';
import { useState } from 'react';
import { z } from 'zod';

interface FormProps<T extends z.ZodTypeAny>
  extends React.ComponentProps<'form'> {
  initialValues: z.infer<T>;
  children: React.ReactNode;
  onSubmit: (values: z.infer<T>) => Promise<void> | void;
  schema?: T;
}

export default function Form<T extends z.ZodTypeAny>({
  initialValues,
  onSubmit,
  children,
  schema,
}: FormProps<T>) {
  const [formValues, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] =
    useState<z.typeToFlattenedError<T>['fieldErrors']>();
  const [pending, setPending] = useState(false);

  const validateFields = (path?: keyof z.infer<T>) => {
    if (!schema) return true;

    const validatedFields = schema.safeParse(formValues);

    if (!validatedFields.success) {
      const calculatedFieldErrors = validatedFields.error.flatten().fieldErrors;
      if (path) {
        setFieldErrors((errors) => ({
          ...errors,
          [path]: calculatedFieldErrors[path],
        }));
      } else {
        setFieldErrors(calculatedFieldErrors);
      }
    }
    return validatedFields.success;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const isFormValid = validateFields();

    if (isFormValid) {
      await onSubmit(formValues);
    }
    setPending(false);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!event.target.name) {
      console.warn('Please provide name field to form input elements');
      return;
    }

    const currentFormValues = {
      ...cloneDeep(formValues),
      [event.target.name]: event.target.value,
    };

    if (has(fieldErrors, event.target.name)) {
      validateFields(event.target.name);
    }
    setFormValues(currentFormValues);
  };

  const handleBlur = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    validateFields(event.target.name);
  };

  const formHandlers = { handleChange, handleBlur };

  return (
    <FormDispatchContext.Provider value={formHandlers}>
      <FormContext.Provider value={{ pending, formValues, fieldErrors }}>
        <form onSubmit={handleSubmit} noValidate>
          {children}
        </form>
      </FormContext.Provider>
    </FormDispatchContext.Provider>
  );
}
