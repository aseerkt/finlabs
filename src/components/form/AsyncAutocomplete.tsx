import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CommandItem } from 'cmdk';
import { isEmpty } from 'lodash';
import { ChevronsUpDown, XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';

interface ComboBoxFieldProps<Option, Value> {
  name: string;
  control: Control<any>;
  options: Option[];
  renderValue: (value: Value) => React.ReactNode;
  getOptionValue: (option: Option) => Value;
  getSearchValue: (option: Option) => string;
  renderOption: (option: Option, index: number) => React.ReactNode;
  onSearch: (term: string) => void;
  optionKey: keyof Option;
  valueKey: keyof Value;
  placeholder?: React.ReactNode;
  autocompletePlaceholder?: string;
  noResultPlaceholder?: React.ReactNode;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  multiple?: boolean;
  disabled?: boolean;
}

export default function AsyncAutocomplete<Option, Value>({
  name,
  control,
  options,
  renderValue,
  renderOption,
  getSearchValue,
  getOptionValue,
  onSearch,
  optionKey,
  valueKey,
  label,
  placeholder = 'Select option',
  autocompletePlaceholder = 'Search option',
  noResultPlaceholder = 'No results found',
  helperText,
  multiple = false,
  disabled = false,
}: ComboBoxFieldProps<Option, Value>) {
  const { append, remove } = useFieldArray({ name, control });
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const valueDisplay = isEmpty(field.value) ? (
          placeholder
        ) : multiple ? (
          (field.value as Value[]).map((value, index) => (
            <div
              className='text-sm flex items-center gap-2 border-1 rounded-sm bg-cyan-600 text-white px-2 py-1'
              key={value[valueKey] as string}
            >
              {renderValue(value)}
              <button
                aria-label={`unselect value ${value[valueKey]}`}
                onClick={() => remove(index)}
              >
                <XCircleIcon height={14} width={14} />
              </button>
            </div>
          ))
        ) : (
          <div className='flex justify-between gap-2 grow'>
            {renderValue(field.value)}
            <button
              aria-label='unselect value'
              onClick={(e) => {
                e.stopPropagation();
                field.onChange(undefined);
              }}
            >
              <XCircleIcon height={14} width={14} />
            </button>
          </div>
        );

        return (
          <FormItem className='grow'>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={handleOpenChange}>
              <PopoverTrigger disabled={disabled} asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    className={cn('w-full justify-between hover:bg-white')}
                  >
                    <div className='flex gap-1 grow'>{valueDisplay}</div>
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className={cn('w-[var(--radix-popover-trigger-width)] p-0')}
              >
                <Command
                  shouldFilter={false}
                  onChange={(event) => {
                    onSearch((event.target as HTMLInputElement).value);
                  }}
                >
                  <CommandInput placeholder={autocompletePlaceholder} />
                  <CommandEmpty>{noResultPlaceholder}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option, index) => (
                      <CommandItem
                        value={getSearchValue(option)}
                        key={option[optionKey] as string}
                        onSelect={() => {
                          const value = getOptionValue(option);
                          if (multiple) {
                            append(value);
                          } else {
                            field.onChange(value);
                            handleOpenChange(false);
                          }
                        }}
                      >
                        {renderOption(option, index)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
