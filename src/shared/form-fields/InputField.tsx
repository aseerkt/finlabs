import { useField } from 'formik';

type InputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <div className='my-3'>
      <label className='form-label' htmlFor={props.name}>
        {label}
      </label>
      <input className='form-field' {...field} id={props.name} {...props} />
    </div>
  );
};
