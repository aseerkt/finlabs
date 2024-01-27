import get from 'lodash/get';
import { createContext, useContext } from 'react';
import { z } from 'zod';

interface FormContextValue<T extends z.ZodTypeAny> {
  formValues: z.infer<T>;
  fieldErrors?: z.typeToFlattenedError<T>['fieldErrors'];
  pending: boolean;
}

interface FormDispatchContextValue {
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleBlur: (
    event: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const FormContext = createContext<FormContextValue<any>>({
  formValues: {},
  fieldErrors: {},
  pending: false,
});

export const FormDispatchContext = createContext<FormDispatchContextValue>({
  handleBlur() {},
  handleChange() {},
});

interface UseFormControlHookArguments {
  name: string;
}

export function useFormControl({ name }: UseFormControlHookArguments) {
  const { formValues, fieldErrors } = useContext(FormContext);
  const { handleBlur, handleChange } = useContext(FormDispatchContext);

  const error = get(fieldErrors, name, []);

  return {
    value: get(formValues, name),
    error: error[0],
    invalid: Boolean(error[0]),
    onChange: handleChange,
    onBlur: handleBlur,
  };
}

export function useFormStatus() {
  const { pending } = useContext(FormContext);
  return { pending };
}
