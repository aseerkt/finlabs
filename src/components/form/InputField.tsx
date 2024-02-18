import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
  formItemClassName?: string;
};

const InputField = ({
  name,
  control,
  label,
  helperText,
  formItemClassName,
  ...props
}: InputFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('pb-5', formItemClassName)}>
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
