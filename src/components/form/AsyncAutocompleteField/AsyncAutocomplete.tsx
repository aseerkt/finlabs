import { buttonVariants } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
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

export interface AsyncAutocompleteProps<Option, Value> {
  value: Value | Value[];
  onValueChange: (value?: Value | Value[]) => void;
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
  multiple?: boolean;
  disabled?: boolean;
}

export default function AsyncAutocomplete<Option, Value>({
  value,
  onValueChange,
  options,
  renderValue,
  renderOption,
  getSearchValue,
  getOptionValue,
  onSearch,
  optionKey,
  valueKey,
  placeholder = 'Select option',
  autocompletePlaceholder = 'Search option',
  noResultPlaceholder = 'No results found',
  multiple = false,
  disabled = false,
}: AsyncAutocompleteProps<Option, Value>) {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);

  const renderedValue = isEmpty(value) ? (
    placeholder
  ) : multiple ? (
    (value as Value[]).map((v, index) => (
      <div
        className='text-sm flex items-center gap-2 border-1 rounded-sm bg-cyan-600 text-white px-2 py-1'
        key={v[valueKey] as string}
      >
        {renderValue(v)}
        <button
          aria-label={`unselect value ${v[valueKey]}`}
          onClick={() => {
            onValueChange((value as Value[]).filter((_, idx) => index !== idx));
          }}
        >
          <XCircleIcon height={14} width={14} />
        </button>
      </div>
    ))
  ) : (
    <div className='flex justify-between gap-2 grow'>
      {renderValue(value as Value)}
      <button
        aria-label='unselect value'
        onClick={(e) => {
          e.stopPropagation();
          onValueChange(undefined);
        }}
      >
        <XCircleIcon height={14} width={14} />
      </button>
    </div>
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger disabled={disabled} asChild>
        <FormControl>
          <div
            role='button'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full justify-between hover:bg-white'
            )}
          >
            <div className='flex gap-1 grow cursor-default'>
              {renderedValue}
            </div>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </div>
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
                  const v = getOptionValue(option);
                  if (multiple) {
                    onValueChange((value as Value[]).concat(v));
                  } else {
                    onValueChange(v);
                  }
                  handleOpenChange(false);
                }}
              >
                {renderOption(option, index)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
