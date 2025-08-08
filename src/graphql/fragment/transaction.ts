import { gql } from '@apollo/client';

export const TRANSACTION_FIELDS = gql`
  fragment TransactionFields on Transaction {
    id
    channel
    type
    state
    token
    amount
    currency
    description
    comment
    createdAt
    updatedAt
    balance
    links {
      name
      description
      logo
      link
    }
    image
  }
`;
