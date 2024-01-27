import { Label } from '@/components/ui/label';
import { useFormControl } from '@/contexts/FormContext';
import * as React from 'react';
import { Textarea, TextareaProps } from '../ui/textarea';

interface TextAreadFieldProps extends TextareaProps {
  label?: React.ReactNode;
  name: string;
}

const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  TextAreadFieldProps
>((props, ref) => {
  const { value, invalid, error, onChange, onBlur } = useFormControl({
    name: props.name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur(e);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <div className='mb-6'>
      {props.label && <Label htmlFor={props.name}>{props.label}</Label>}
      <Textarea
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
});

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
