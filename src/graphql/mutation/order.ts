import { gql } from '@apollo/client';
import { TABLE_FIELDS, TRANSACTION_FIELDS } from '../fragment';
import { CHARGES_FIELDS, DISCOUNTS_FIELDS, ORDER_FIELDS, ORDER_ITEM_FIELDS, ORDER_LOYALTY_FIELDS } from '../query';

export const CREATE_ORDER = gql`
  mutation createOrder($id: ID, $input: OrderInput!, $participant: ID!) {
    createOrder(id: $id, input: $input, participant: $participant) {
      ...OrderFields
      items {
        ...OrderItemFields
      }
      transactions {
        ...TransactionFields
      }
      table {
        ...TableFields
      }
      discounts {
        ...DiscountsFields
      }
      charges {
        ...ChargesFields
      }
      loyalties {
        ...OrderLoyaltyFields
      }
    }
  }
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
`;

export const GET_PAY_ORDER = gql`
  mutation payOrder($input: TransactionInput!) {
    payOrder(input: $input) {
      order {
        ...OrderFields
        table {
          ...TableFields
        }
        items {
          ...OrderItemFields
        }
        transactions {
          ...TransactionFields
        }
        loyalties {
          ...OrderLoyaltyFields
        }
      }
      transaction {
        ...TransactionFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
  ${TRANSACTION_FIELDS}
`;

export const VALIDATE_TRANSACTION = gql`
  mutation validateTransaction($id: ID!) {
    validateTransaction(id: $id) {
      ...OrderFields
      table {
        ...TableFields
      }
      items {
        ...OrderItemFields
      }
      transactions {
        ...TransactionFields
      }
      loyalties {
        ...OrderLoyaltyFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${TABLE_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
`;
