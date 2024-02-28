import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control } from 'react-hook-form';
import AsyncAutocomplete, { AsyncAutocompleteProps } from './AsyncAutocomplete';

interface AsyncAutocompleteFieldProps<Option, Value>
  extends Omit<
    AsyncAutocompleteProps<Option, Value>,
    'value' | 'onValueChange'
  > {
  name: string;
  control: Control<any>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
}

export default function AsyncAutocompleteField<Option, Value>({
  name,
  control,
  label,
  helperText,
  ...props
}: AsyncAutocompleteFieldProps<Option, Value>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className='grow'>
            {label && <FormLabel>{label}</FormLabel>}
            <AsyncAutocomplete
              value={field.value}
              onValueChange={field.onChange}
              {...props}
            />
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
