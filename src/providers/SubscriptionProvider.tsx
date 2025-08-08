import React, { useContext, useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { ON_UPDATED_ORDER } from '../graphql/subscription/order';
import { IOrder } from '../types';
import { GET_ORDERS } from '../graphql/query';
import { AuthContext, getPayload } from './auth';

const SubscriptionProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  let customerId: string;

  if (isAuthenticated) {
    customerId = getPayload()?.sub;
  }

  useSubscription(ON_UPDATED_ORDER, {
    variables: { customer: customerId },
    skip: !customerId,
    onData({ client, data }) {
      if (!data) return;
      const caches = client.readQuery<{ getOrders: IOrder[] }>({ query: GET_ORDERS });
      if (!caches || !caches.getOrders) return;

      const { event, order: subscriptionOrder } = data.data.onUpdatedOrder;
      const updatedOrders = caches.getOrders.map((order) =>
        order?.id === subscriptionOrder.id ? subscriptionOrder : order,
      );

      switch (event) {
        case 'CREATED':
        case 'UPDATED':
          if (!updatedOrders.find((order) => order?.id === subscriptionOrder.id)) {
            updatedOrders.push(subscriptionOrder);
          }
          break;
        case 'DELETE':
          client.writeQuery({
            query: GET_ORDERS,
            data: { getOrders: updatedOrders.filter((order) => order?.id !== subscriptionOrder.id) },
          });
          break;
        default:
          return;
      }

      client.writeQuery({
        query: GET_ORDERS,
        data: { getOrders: updatedOrders },
      });
    },
  });

  useEffect(() => {
    // Clean up the subscription when the component unmounts
    return () => {
      // Unsubscribe or perform any necessary cleanup
    };
  }, []);

  return <>{children}</>;
};

export default SubscriptionProvider;
