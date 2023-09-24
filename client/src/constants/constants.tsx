import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $phone: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      phone: $phone
      password: $password
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const ALL_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      title
      description
      categories {
        id
      }
      price
      rent
      rentInterval
      createdAt
      updatedAt
      ownerId
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: String!) {
    getProductById(productId: $productId) {
      id
      title
      description
      price
      rent
      rentInterval
      createdAt
      categories {
        id
        name
      }
    }
  }
`;
