import React, { useEffect, useState } from 'react';
import { Banner, Contacts, Evaluation, Header, RestaurantDescription, TimeTable } from '../../components';
import { useCallStore } from '../../contexts/call.store';

const Index = () => {
  const { participant } = useCallStore();
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 0);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <>
      {showContent && (
        <>
          <Header isBacked />
          <Banner branch={participant?.branch} />
          <div className="grid grid-cols-1  md:grid-cols-2">
            <RestaurantDescription branch={participant?.branch} />
            <TimeTable timeTable={participant?.branch.timetable} />
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2">
            <Contacts
              address={participant?.branch.address}
              email={participant?.branch.email}
              phone={participant?.branch.phone}
            />
            <Evaluation />
          </div>
        </>
      )}
    </>
  );
};

export default Index;
