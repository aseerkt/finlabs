import { useField } from 'formik';

type TextFieldProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string;
  name: string;
};

export const TextAreaField: React.FC<TextFieldProps> = ({
  label,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <div className='my-3'>
      <label className='form-label' htmlFor={props.name}>
        {label}
      </label>
      <textarea className='form-field' {...field} id={props.name} {...props} />
    </div>
  );
};
