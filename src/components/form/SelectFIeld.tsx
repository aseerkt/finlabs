import { cn } from '@/lib/utils';
import { SelectProps } from '@radix-ui/react-select';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface SelectFieldProps<Option> extends SelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  getOptionValue: (option: Option) => string;
  getOptionLabel: (option: Option) => string;
  getCurrentOptionDisplay: (
    option?: Option,
    placeholder?: React.ReactNode
  ) => React.ReactNode;
  optionKey: keyof Option;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  placeholder?: string;
}

export default function SelectField<Option>({
  name,
  control,
  options,
  optionKey,
  getOptionValue,
  getOptionLabel,
  getCurrentOptionDisplay,
  label,
  helperText,
  placeholder,
  ...props
}: SelectFieldProps<Option>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const currentOption = options.find(
          (option) => getOptionValue(option) === field.value
        );
        return (
          <FormItem>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className={cn('gap-2')}>
                  <SelectValue
                    placeholder={placeholder}
                    aria-label={field.value}
                  >
                    {getCurrentOptionDisplay(currentOption, placeholder)}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option[optionKey] as string}
                    value={getOptionValue(option)}
                  >
                    {getOptionLabel(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
