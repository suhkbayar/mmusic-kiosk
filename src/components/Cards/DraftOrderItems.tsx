import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit } from 'react-icons/ai';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { CommentModal } from '..';
import { isEmpty } from 'lodash';
import { FiMinus, FiPlus } from 'react-icons/fi';
import useSound from 'use-sound';
import { SOUND_LINK } from '../../constants/constant';
import { Translate } from 'react-auto-translate';
import fallback from '../../assets/images/noImage.jpg';

type Props = {
  item: any;
  image: string;
};

const Index = ({ item, image }: Props) => {
  const [play] = useSound(SOUND_LINK, {
    volume: 1,
  });
  const { t } = useTranslation('language');
  const [visible, setVisible] = useState(false);

  const { addOrderItem, remove, addOrderItemComment } = useCallStore();

  const addComment = (comment: string) => {
    addOrderItemComment(item, comment);
  };

  const showAddComment = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="bg-white grid grid-cols-8 mb-6 rounded-xl w-full place-content-between ">
        <div className="flex col-span-4">
          <div className="w-[7rem] place-self-center ">
            <img alt="image " className="w-52 rounded-lg h-full" src={image || fallback.src} />
          </div>
          <div className="w-40 ml-2 grid p-1 place-content-between">
            <span className="text-xl  font-bold text-gray-700  line-clamp-2 ">
              <Translate>{item?.name}</Translate>
            </span>

            <div className="flex items-center cursor-pointer" onClick={() => showAddComment()}>
              <AiOutlineEdit className="text-gray1 mr-2" />
              <span className="text-sm text-gray1 line-clamp-1">
                {isEmpty(item?.comment) ? <>{t('mainPage.additionalRequests')}</> : item?.comment}
              </span>
            </div>
          </div>
        </div>

        <div className="place-self-center flex w-full col-span-2">
          <span className="text-xl font-bold  text-gray-700 ">
            {item?.price.toLocaleString()} {CURRENCY}
          </span>
        </div>

        <div className="place-self-center flex w-full  col-span-2">
          <div className=" flex w-full justify-end">
            <div className="flex items-center place-content-center py-1">
              <div
                onClick={() => {
                  play();
                  remove(item);
                }}
                className="bg-white border button-variant border-gray-200  rounded-xl py-3 px-6 "
              >
                <FiMinus className="text-xl" />
              </div>

              <p className={`mx-2 text-2xl font-bold text-gray-500 `}>{item?.quantity}</p>

              <div
                onClick={() => {
                  play();
                  addOrderItem(item);
                }}
                className="bg-macDonald  button rounded-xl py-3 px-6 text-white"
              >
                <FiPlus className="text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {visible && (
        <CommentModal
          comment={item.comment}
          visible={visible}
          onClose={() => setVisible(false)}
          addComment={addComment}
        />
      )}
    </>
  );
};

export default Index;
