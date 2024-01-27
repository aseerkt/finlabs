import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormControl } from '@/contexts/FormContext';
import * as React from 'react';

interface InputFieldProps extends InputProps {
  label?: React.ReactNode;
  name: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const { value, invalid, error, onChange, onBlur } = useFormControl({
      name: props.name,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur(e);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    return (
      <div className='h-24'>
        {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
        <Input
          ref={ref}
          id={props.name}
          {...props}
          value={value as string}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {invalid && (
          <div role='alert' className='text-red-600 text-xs mt-2'>
            {error}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
