import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, LanguagesKey } from '../../constants/constantLang';
import { IoClose } from 'react-icons/io5';
import { useCallStore } from '../../contexts/call.store';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { ME, GET_BRANCH } from '../../graphql/query';
import { UPDATE_PROFILE } from '../../graphql/mutation/register';
import { ICustomer } from '../../types/customer';
import { isEmpty } from 'lodash';
const ToggleLanguage = () => {
  const { i18n } = useTranslation('language');
  const [isShow, setIsShow] = useState(false);
  const { participant, setParticipant } = useCallStore();

  const { data } = useQuery(ME, {
    onCompleted(data) {
      if (data?.me?.language) {
        i18n.changeLanguage(data.me.language.toLowerCase());
      }
    },
  });

  const [getBranch] = useLazyQuery(GET_BRANCH, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setParticipant(data.getParticipant);
    },
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    update(cache, { data: { updateProfile } }) {
      const caches = cache.readQuery<{ me: ICustomer }>({ query: ME });
      if (caches && caches.me) {
        cache.writeQuery({
          query: ME,
          data: {
            me: caches.me.id === updateProfile.id ? updateProfile : caches.me,
          },
        });
      }
    },
    onCompleted: (data) => {
      getBranch({ variables: { id: participant.id } });
    },
    onError(err) {
      console.error('Error updating profile:', err);
    },
  });

  const languageNames = participant?.branch?.languages?.map((lang) => lang.toLowerCase());
  const filteredLanguages = Languages?.filter((lang) => languageNames?.includes(lang.name.toLowerCase()));

  const onSelect = (lang: string) => {
    setIsShow(false);
    i18n.changeLanguage(lang);
    let input = {
      firstName: data?.me?.firstName,
      lastName: data?.me?.lastName,
      gender: data?.me?.gender,
      birthday: null,
      email: isEmpty(data?.me?.email) ? null : data?.me?.email,
      language: lang.toUpperCase(),
    };
    updateProfile({ variables: { input } });
  };

  return (
    <div className="place-self-center  ">
      <img
        src={
          Languages.find((item) => i18n.language.includes(item.name.toLowerCase())).icon.src ?? Languages[0].icon.src
        }
        height={22}
        width={52}
        onClick={() => setIsShow(!isShow)}
      />
      {isShow && (
        <div className={`fixed z-50 inset-0 flex items-center justify-center ${isShow ? '' : 'hidden'}`}>
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <div className="align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-xs sm:w-full">
            <div className="w-full flex items-end justify-end">
              <IoClose className="text-end mx-2 my-2 text-xl" onClick={() => setIsShow(!isShow)} />
            </div>
            <div className="grid w-full gap-5 p-4 pt-0 px-8 pb-8">
              {filteredLanguages.map((item, index) => (
                <div
                  className={`grid grid-cols-4 w-full p-2  gap-2 cursor-pointer hover:bg-gray-200  ${
                    item.name.toLowerCase() === i18n.language.toLowerCase() ? 'bg-gray-200 ' : 'bg-gray-50 '
                  } rounded-lg items-center justify-center`}
                  onClick={() => onSelect(item.name.toLowerCase())}
                >
                  <div className="col-span-1 w-full">
                    <img key={item.name} height={12} width={30} src={Languages[index].icon.src} />
                  </div>
                  <span className=" col-span-3 text-center text-2xl text-gray-700">
                    {LanguagesKey.find((lang) => lang.key === item.name)?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleLanguage;
