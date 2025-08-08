import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import { useForm } from 'react-hook-form';

type Props = {
  visible: boolean;
  onClose: () => void;
  addComment: (comment: string) => void;
  comment: string;
};

type FormData = {
  comment: string;
};

const Index = ({ visible, onClose, addComment, comment }: Props) => {
  const { t } = useTranslation('language');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { comment: comment },
  });

  const onSave = (data: FormData) => {
    addComment(data.comment);
    onClose();
  };

  return (
    <Modal show={visible} theme={customThemeWaiterModal} className="flex h-96" onClose={() => onClose()}>
      <form className=" w-full   place-items-center" action="" onSubmit={handleSubmit(onSave)}>
        <Modal.Body className="p-1 w-full">
          <div className="text-base mb-2 text-misty text-center font-semibold ">{t('mainPage.additionalRequests')}</div>
          <textarea
            aria-label={t('mainPage.additionalRequests')}
            rows={3}
            placeholder={t('mainPage.additionalRequests')}
            className="w-full px-4 py-2 text-gray1 text-sm transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            {...register('comment', { required: false })}
          />
        </Modal.Body>

        <Modal.Footer className="place-content-center w-6/12	">
          <div className="grid gap-2 place-items-center w-full">
            <button
              type="submit"
              className={`w-full flex place-content-center justify-center p-3 rounded-lg cursor-pointer
           bg-current
            `}
              aria-label={t('mainPage.save')}
            >
              <span className="block text-sm text-white font-semibold">{t('mainPage.save')}</span>
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Index;
