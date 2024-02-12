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
import { Textarea, TextareaProps } from '../ui/textarea';

interface TextAreadFieldProps extends TextareaProps {
  name: string;
  control: Control<any>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
}

const TextAreaField = ({
  name,
  control,
  label,
  helperText,
  ...props
}: TextAreadFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className='mb-6'>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Textarea id={name} {...props} {...field} />
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
