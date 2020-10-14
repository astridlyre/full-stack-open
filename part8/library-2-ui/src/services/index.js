import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('booktime-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql ' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

// const GET_AUTHORS = gql`
//   query {
//     allAuthors {
//       name
//       born
//       bookCount
//       id
//     }
//   }
// `

// const GET_BOOKS = gql`
//   query {
//     allBooks {
//       title
//       published
//       author
//       genres
//       id
//     }
//   }
// `

const GET_AUTHORS_AND_BOOKS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
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

const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
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

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
      id
    }
  }
`

const ME = gql`
  query {
    me {
      name
      username
      favoriteGenre
      id
    }
  }
`

const ADD_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      name
      username
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export {
  client,
  GET_AUTHORS_AND_BOOKS,
  ADD_BOOK,
  EDIT_AUTHOR,
  ME,
  ADD_USER,
  LOGIN,
}
