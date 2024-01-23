'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {}

const SubmitButton = (props: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return <Button type='submit' disabled={pending} {...props}></Button>;
};

export default SubmitButton;
