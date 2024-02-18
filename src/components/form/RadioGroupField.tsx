'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  options: {
    label: React.ReactNode;
    value: string;
  }[];
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  direction?: 'row' | 'column';
}

const directionClassNames = {
  row: 'space-x-3',
  column: 'flex-col space-y-3',
};

export default function RadioGroupField({
  name,
  control,
  options,
  label,
  helperText,
  direction = 'row',
}: RadioGroupFieldProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className='space-y-3 pb-5'>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              {...field}
              className={cn('flex', directionClassNames[direction])}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className='flex space-y-0 items-center'
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className='cursor-pointer ml-2 inline-block mt-0'>
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {helperText && <FormDescription>{helperText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
