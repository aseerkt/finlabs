import { useField } from 'formik';

type SelectFieldProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label: string;
  name: string;
};

export const selectField: React.FC<SelectFieldProps> = ({
  label,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <div className='my-3'>
      <label className='form-label' htmlFor={props.name}>
        {label}
      </label>
      <select className='form-field' {...field} id={props.name} {...props} />
    </div>
  );
};
