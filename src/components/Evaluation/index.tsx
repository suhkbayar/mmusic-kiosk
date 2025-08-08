import { useQuery } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoComment } from 'react-icons/go';
import { GET_ORDER_REVIEWS } from '../../graphql/query/order';
import ListSkelton from '../Skelton/ListSkelton';
import { isEmpty } from 'lodash';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { timeAgo } from '../../tools/calcTimeTable';

const Index = () => {
  const { t } = useTranslation('language');

  const { data, loading } = useQuery(GET_ORDER_REVIEWS);

  if (loading) return <ListSkelton />;

  return (
    <>
      <div className="w-full p-4">
        <div className="flex items-center mb-4 ">
          <GoComment className="text-misty w-6 h-6 mr-1" />
          <p className="font-semibold text-misty ">{t('mainPage.Review')}</p>
        </div>

        {data.getOrderReviewsByLimit.map((review, i) => {
          if (isEmpty(review.additional)) return;
          return (
            <React.Fragment key={i}>
              <div className="flex w-full items-center ">
                <div className="flex flex-row justify-center">
                  <span className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-200 text-xl text-gray1 uppercase">
                    {review.customer.firstName.slice(0, 1).toLowerCase()}
                  </span>
                </div>

                <div className="flex  items-center w-full place-content-between">
                  <div>
                    <p className="font-medium">{review.customer.firstName}</p>
                    <p className="text-sm mt-2">{review.additional}</p>
                  </div>
                  <div className="place-content-end">
                    <div className="flex items-center place-content-end">
                      <p className="text-sm items-left text-current">{review.comment.replace(/\[|\]/g, '')}</p>
                      {review.liked < 1 ? (
                        <AiOutlineDislike className="text-current text-lg" />
                      ) : (
                        <AiOutlineLike className="text-current text-lg" />
                      )}
                    </div>
                    <div className="flex place-content-end text-left mt-2">
                      <p className="text-sm text-left m-0 text-grayish">{timeAgo(review.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b my-4"></div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Index;
