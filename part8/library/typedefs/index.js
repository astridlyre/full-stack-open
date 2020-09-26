const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    name: String!
    id: ID!
    passwordHash: String!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(name: String!, born: Int!): Author
    addUser(
      username: String!
      name: String!
      favoriteGenre: String
      password: String!
    ): User
    login(username: String!, password: String!): Token
  }
`

module.exports = typeDefs
