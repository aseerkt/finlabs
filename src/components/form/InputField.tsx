import { Input, InputProps } from '@/components/ui/input';
import * as React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

type InputFieldProps = InputProps & {
  name: string;
  control: Control<any>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
};

const InputField = ({
  name,
  control,
  label,
  helperText,
  ...props
}: InputFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className='pb-5'>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Input id={name} {...props} {...field} />
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

InputField.displayName = 'InputField';

export default InputField;
