import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    url: 'http://localhost:4000',
  }),
})

export const POPULATE_NUMS = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      address {
        street
        city
      }
    }
  }
`

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

export const DEL_PERSON = gql`
  mutation deletePerson($id: String!) {
    delPerson(id: $id) {
      id
    }
  }
`
