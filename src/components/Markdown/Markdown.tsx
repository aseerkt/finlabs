import Editor from '@uiw/react-md-editor';

interface MarkdownProps extends React.ComponentProps<typeof Editor.Markdown> {}

export default function Markdown({ source, ...rest }: MarkdownProps) {
  return (
    <Editor.Markdown
      {...rest}
      wrapperElement={{
        'data-color-mode': 'light',
        ...rest.wrapperElement,
        style: {
          listStyle: 'disc',
        },
      }}
      source={source}
    />
  );
}
