import { gql } from '@apollo/client';
import { CUSTOMER_FIELDS, ORDER_ITEM_OPTION_FIELDS, TABLE_FIELDS, TRANSACTION_FIELDS } from '../fragment';

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    type
    date
    number
    state
    branchId
    customerId
    isRead
    paymentState
    address
    floor
    channelType
    contact
    guests
    comment
    name
    deliveryDate
    totalAmount
    discountAmount
    taxAmount
    grandTotal
    paidAmount
    debtAmount
    createdAt
    updatedAt
    register
    buyer
    vatState
    vatType
    vatAmount
    cityTax
    vatBillId
    vatIncludeAmount
    vatExcludeAmount
    vatDate
    vatLottery
    vatData
    orderedAt
    acceptedAt
    preparingAt
    preparedAt
    deliveringAt
    deliveredAt
    completedAt
    cancelledAt
    returnedAt
    movedAt
    printed
    name
  }
`;

export const ORDER_ITEM_FIELDS = gql`
  fragment OrderItemFields on OrderItem {
    id
    state
    quantity
    comment
    reason
    total
    name
    price
    discount
    createdAt
    updatedAt
    completedAt
    image
    variantName
    options {
      ...OrderItemOptionFields
    }
  }
  ${ORDER_ITEM_OPTION_FIELDS}
`;

export const ORDER_LOYALTY_FIELDS = gql`
  fragment OrderLoyaltyFields on OrderLoyalty {
    id
    type
    date
    code
    point
    data
    data1
    state
  }
`;

export const DISCOUNTS_FIELDS = gql`
  fragment DiscountsFields on OrderDiscount {
    amount
    calculation
    createdAt
    discountId
    state
    id
    name
    type
    updatedAt
    value
  }
`;

export const ORDER_VATS_FIELD = gql`
  fragment VatsFields on Vat {
    amount
    citytax
    buyer
    createdAt
    date
    id
    state
    register
    type
    updatedAt
  }
`;

export const CHARGES_FIELDS = gql`
  fragment ChargesFields on OrderCharge {
    calculation
    amount
    createdAt
    id
    state
    name
    chargeId
    type
    value
    updatedAt
  }
`;

export const GET_ORDER_REVIEWS = gql`
  query getOrderReviewsByLimit($offset: Int, $limit: Int) {
    getOrderReviewsByLimit(offset: $offset, limit: $limit) {
      id
      createdAt
      updatedAt
      type

      liked
      comment
      additional
      pictures
      uploads
      order {
        ...OrderFields
      }
      customer {
        ...CustomerFields
      }
    }
  }
  ${CUSTOMER_FIELDS}
  ${ORDER_FIELDS}
`;

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      branch {
        id
        logo
        type
        name
      }
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

export const GET_ORDERS = gql`
  {
    getOrders {
      branch {
        id
        logo
        type
        name
      }
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
      discounts {
        ...DiscountsFields
      }
      charges {
        ...ChargesFields
      }
    }
  }
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
`;
