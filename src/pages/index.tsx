import type { NextPage } from 'next';
import Loader from '../components/Loader/Loader';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/query';

const Home: NextPage = () => {
  const { data } = useQuery(GET_ORDERS);

  console.log(data);
  return <Loader />;
};

export default Home;
