import { cn } from '@/lib/utils';
import MdEditor, { ICommand, MDEditorProps } from '@uiw/react-md-editor';
import { Control } from 'react-hook-form';
import rehypeSanitize from 'rehype-sanitize';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { editorCommands, editorExtraCommands } from './commands';

interface MdEditorFieldProps extends MDEditorProps {
  name: string;
  control: Control<any>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  formItemClassName?: string;
}

const writeCommand: ICommand = {
  name: 'write',
  keyCommand: '',
};

export default function MdEditorField({
  name,
  control,
  label,
  helperText,
  formItemClassName,
  ...props
}: MdEditorFieldProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormItem className={cn('pb-5', formItemClassName)}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <FormControl>
              <MdEditor
                data-color-mode='light'
                commands={editorCommands}
                extraCommands={editorExtraCommands}
                preview='edit'
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                {...props}
                {...field}
              />
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        </FormItem>
      )}
    />
  );
}
