import { get } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { createContext, memo, useCallback, useContext, useState } from 'react';
import { z } from 'zod';

interface FormContextValue<T extends z.ZodTypeAny> {
  formValues: z.infer<T>;
  fieldErrors?: z.typeToFlattenedError<T>['fieldErrors'];
  pending: boolean;
}

enum ValidationMode {
  ON_SUBMIT = 'onSubmit',
  ON_CHANGE = 'onChange',
  ON_BLUR = 'onBlur',
}

interface FormDispatchContextValue {
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleBlur: () => void;
}

const FormContext = createContext<FormContextValue<any>>({
  formValues: {},
  fieldErrors: {},
  pending: false,
});

const FormDispatchContext = createContext<FormDispatchContextValue>({
  handleBlur() {},
  handleChange() {},
});

interface FormProps<T extends z.ZodTypeAny>
  extends React.ComponentProps<'form'> {
  initialValues: z.infer<T>;
  children: React.ReactNode;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  validationMode?: ValidationMode;
  schema?: T;
}

function Form<T extends z.ZodTypeAny>({
  initialValues,
  onSubmit,
  children,
  schema,
  validationMode = ValidationMode.ON_SUBMIT,
}: FormProps<T>) {
  const [formValues, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] =
    useState<z.typeToFlattenedError<T>['fieldErrors']>();
  const [pending, setPending] = useState(false);

  const validateFields = () => {
    if (!schema) return true;

    const validatedFields = schema.safeParse(formValues);

    if (!validatedFields.success) {
      setFieldErrors(validatedFields.error.flatten().fieldErrors);
    }
    return validatedFields.success;
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setPending(true);
      const isFormValid = validateFields();

      if (isFormValid) {
        await onSubmit(formValues);
      }
      setPending(false);
    },
    []
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!event.target.name)
      console.warn('Please provide name field to form input elements');

    const currentFormValues = {
      ...cloneDeep(formValues),
      [event.target.name]: event.target.value,
    };

    console.log(formValues, currentFormValues);

    setFormValues(currentFormValues);

    if (validationMode === ValidationMode.ON_CHANGE) {
      validateFields();
    }
  };

  const handleBlur = () => {
    if (validationMode === ValidationMode.ON_BLUR) {
      validateFields();
    }
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

export default memo(Form);

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
