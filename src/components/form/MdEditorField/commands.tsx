import { Button } from '@/components/ui/button';
import { ICommand, commands } from '@uiw/react-md-editor';

// COMMANDS

const write: ICommand = {
  ...commands.codeEdit,
  buttonProps: {},
  render(command, disabled, executeCommand) {
    return (
      <Button
        disabled={disabled}
        type='button'
        size='lg'
        variant='ghost'
        {...commands.codeEdit.buttonProps}
        onClick={() => executeCommand(command, command.groupName)}
      >
        Write
      </Button>
    );
  },
};

const preview: ICommand = {
  ...commands.codePreview,
  render(command, disabled, executeCommand) {
    return (
      <Button
        disabled={disabled}
        type='button'
        size='lg'
        variant='ghost'
        {...commands.codePreview.buttonProps}
        onClick={() => executeCommand(command, command.groupName)}
      >
        Preview
      </Button>
    );
  },
};

// EXTRA COMMANDS

const heading3: ICommand = {
  ...commands.title3,
  render(command, disabled, executeCommand) {
    return (
      <Button
        disabled={disabled}
        type='button'
        size='lg'
        variant='ghost'
        {...commands.title3.buttonProps}
        onClick={() => executeCommand(command, command.groupName)}
      >
        H
      </Button>
    );
  },
};

const bold: ICommand = {
  ...commands.bold,
  render(command, disabled, executeCommand) {
    return (
      <Button
        disabled={disabled}
        type='button'
        size='lg'
        variant='ghost'
        {...commands.bold.buttonProps}
        className='font-bold'
        onClick={() => executeCommand(command, command.groupName)}
      >
        B
      </Button>
    );
  },
};

const italics: ICommand = {
  ...commands.italic,
  render(command, disabled, executeCommand) {
    return (
      <Button
        disabled={disabled}
        type='button'
        size='lg'
        variant='ghost'
        {...commands.italic.buttonProps}
        className='italic'
        onClick={() => executeCommand(command, command.groupName)}
      >
        I
      </Button>
    );
  },
};

export const editorCommands = [write, preview];
export const editorExtraCommands = [
  heading3,
  bold,
  italics,

  commands.divider,

  commands.codeBlock,
  commands.quote,
  commands.link,

  commands.divider,

  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.checkedListCommand,
];
