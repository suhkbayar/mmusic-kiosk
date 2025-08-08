import { gql } from '@apollo/client';

export const GET_PAYMENT = gql`
  query getPayment($id: ID!) {
    getPayment(id: $id) {
      id
      name
      type
      fee
      merchantCode
      invoiceCode
      account
      active
      owner
      bank
    }
  }
`;
