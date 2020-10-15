import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  split,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

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

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

const AUTHOR_DETALS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DETALS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
    id
  }
`

const GET_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETALS}
`

const GET_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`

const GET_BOOKS = gql`
  query allBooks($genres: String) {
    allBooks(genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETALS}
`

const GET_AUTHORS_AND_BOOKS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
    allBooks {
      ...BookDetails
    }
  }
  ${AUTHOR_DETALS}
  ${BOOK_DETALS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETALS}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETALS}
`

const DEL_BOOK = gql`
  mutation delBook($id: ID!) {
    delBook(id: $id) {
      message
    }
  }
`

const ME = gql`
  query {
    me {
      name
      username
      genre
      id
    }
  }
`

const EDIT_USER = gql`
  mutation editUser($username: String!, $name: String!, $genre: String!) {
    editUser(username: $username, name: $name, genre: $genre) {
      username
      name
      genre
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

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETALS}
`

const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETALS}
`

const AUTHOR_UPDATED = gql`
  subscription {
    authorUpdated {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETALS}
`

export {
  client,
  GET_BOOKS,
  GET_AUTHORS,
  GET_GENRES,
  GET_AUTHORS_AND_BOOKS,
  ADD_BOOK,
  EDIT_AUTHOR,
  ME,
  EDIT_USER,
  DEL_BOOK,
  ADD_USER,
  LOGIN,
  BOOK_ADDED,
  AUTHOR_ADDED,
  AUTHOR_UPDATED,
}
