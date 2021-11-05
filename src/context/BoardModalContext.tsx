import useDisclosure from '@/libs/useDisclosure';
import { IBoard } from '@/models/Board';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Button from '@/shared/Button';
import { InputField, SelectField, TextAreaField } from '@/shared/form-fields';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/shared/Modal';
import { Form, Formik } from 'formik';
import { useProject } from '@/context/ProjectContext';
import { isEmptyObj } from '@/helpers/isEmptyObj';

type ColumnParams = { columnId: string; title: string };

type SetModalFunction = (column: ColumnParams, boardToEdit?: IBoard) => void;

interface BoardModalContext {
  column: ColumnParams;
  setBoardModal: SetModalFunction;
  modelHelper: ReturnType<typeof useDisclosure>;
}

const BoardModalContext = createContext<BoardModalContext>(null);

function BoardModalProvider({ children }: { children: React.ReactNode }) {
  const [column, setColumn] = useState<ColumnParams | undefined>();
  const [boardToEdit, setBoardToEdit] = useState<IBoard | undefined>();
  const { isOpen, onClose, onOpen, toggle } = useDisclosure();
  const { addBoard, editBoard, project } = useProject();

  const setBoardModal: SetModalFunction = (column, board = undefined) => {
    setColumn(column);
    setBoardToEdit(board);
  };

  useEffect(() => {
    if (column) onOpen();
    else onClose();
    // eslint-diable-next-line react-hooks/exhaustive-deps
  }, [column]);

  useEffect(() => {
    if (!isOpen) setBoardToEdit(undefined);
    // eslint-diable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <BoardModalContext.Provider
      value={{
        column,
        modelHelper: { isOpen, onClose, onOpen, toggle },
        setBoardModal,
      }}
    >
      <Modal isOpen={isOpen}>
        <ModalContent>
          <ModalHeader isClosable onClose={onClose}>
            {boardToEdit ? 'Edit' : 'Add'} board
          </ModalHeader>
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={
                !boardToEdit
                  ? {
                      title: '',
                      description: '',
                      columnId: column?.columnId,
                    }
                  : { ...boardToEdit, columnId: column?.columnId }
              }
              onSubmit={async (values) => {
                const { columnId, ...board } = values;
                try {
                  if (!boardToEdit) {
                    await addBoard(board, columnId);
                  } else {
                    await editBoard(board as IBoard, columnId);
                  }
                  onClose();
                } catch (err) {
                  alert(err);
                }
              }}
            >
              {({ isSubmitting, values }) => (
                <Form id='board-form'>
                  <InputField label='title' name='title' />
                  <TextAreaField label='description' name='description' />
                  <SelectField label='column' name='columnId'>
                    {project.columns.map((col) => (
                      <option
                        key={`${col._id}_${boardToEdit ? 'edit' : 'add'}`}
                        value={col._id.toString()}
                      >
                        {col.title}
                      </option>
                    ))}
                  </SelectField>

                  <ModalFooter isClosable onClose={onClose}>
                    <Button
                      isLoading={isSubmitting}
                      disabled={isEmptyObj(values, ['description'])}
                      form='board-form'
                      type='submit'
                    >
                      Save board
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      {children}
    </BoardModalContext.Provider>
  );
}

export const useBoardModal = () => useContext(BoardModalContext);

export default BoardModalProvider;
