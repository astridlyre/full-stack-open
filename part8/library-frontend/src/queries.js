import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`

export const ME = gql`
  query {
    me {
      name
      username
      favoriteGenre
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`

export const ADD_USER = gql`
  mutation createUser($name: String!, $username: String!, $password: String!) {
    addUser(name: $name, username: $username, password: $password) {
      name
      username
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation setBirthday($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
    }
  }
`
