import { useAuth } from '@/context/AuthContext';
import { useProject } from '@/context/ProjectContext';
import { isEmptyObj } from '@/helpers/isEmptyObj';
import useDisclosure from '@/libs/useDisclosure';
import Button from '@/shared/Button';
import { InputField, TextAreaField } from '@/shared/form-fields';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/shared/Modal';
import { Form, Formik } from 'formik';
import { FaPen } from 'react-icons/fa';

const EditProjectModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { project, editProject } = useProject();

  return (
    <>
      <Button className='w-max' isRound onClick={onOpen}>
        <FaPen />
      </Button>
      <Modal isOpen={isOpen}>
        <ModalContent>
          <ModalHeader isClosable onClose={onClose}>
            Edit project info
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: project.name,
                description: project.description,
                sourceCode: project.sourceCode,
                website: project.website,
              }}
              onSubmit={async (values) => {
                try {
                  await editProject(values);
                  onClose();
                } catch (err) {
                  alert(JSON.stringify(err));
                }
              }}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <InputField label='name' name='name' />
                  <TextAreaField label='description' name='description' />
                  <InputField
                    type='url'
                    label='source code'
                    name='sourceCode'
                    placeholder='https://github.com/octokit/example'
                  />
                  <InputField
                    type='url'
                    label='website'
                    name='website'
                    placeholder='https://octokit.com'
                  />

                  <ModalFooter>
                    <Button
                      type='submit'
                      isLoading={isSubmitting}
                      disabled={isEmptyObj(values, ['sourceCode', 'website'])}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProjectModal;
