const Book = require('../models/book')
const Author = require('../models/author')
const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (!args.author && !args.genres) {
        const payload = await Book.find({}).populate('author', {
          name: 1,
          bookCount: 1,
          born: 1,
        })
        return payload
      }

      if (args.author && !args.genres) {
        const author = await Author.findOne({ name: args.author })
        const payload = await Book.find({ author: author._id }).populate(
          'author',
          {
            name: 1,
            bookCount: 1,
            born: 1,
          }
        )
        return payload
      }

      if (!args.author && args.genres) {
        payload = await Book.find({ genres: { $in: [args.genres] } }).populate(
          'author',
          {
            name: 1,
            bookCount: 1,
            born: 1,
          }
        )

        return payload
      }

      if (args.author && args.genres) {
        const author = await Author.findOne({ name: args.author })
        const payload = await Book.find({
          author: author._id,
          genres: { $in: [args.genres] },
        }).populate('author', {
          name: 1,
          bookCount: 1,
          born: 1,
        })

        return payload
      }
    },

    allAuthors: () => Author.find({}),

    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('Must be logged in!')
      let author = await Author.findOne({ name: args.author })
      console.log(author)
      if (author) {
        author.bookCount++
        try {
          await author.save()
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args })
        }
      } else {
        author = new Author({
          name: args.author,
          bookCount: 1,
        })
        try {
          await author.save()
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args })
        }
      }

      const book = new Book({ ...args, author: author })
      console.log(author._id)

      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
      const payload = book.populate('author', { name: 1 })
      return payload
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('Must be logged in!')
      const author = await Author.findOne({ name: args.name })
      author.born = +args.born
      try {
        await author.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
      return author
    },

    addUser: async (root, args) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({
        username: args.username,
        name: args.name,
        favoriteGenre: args.favoriteGenre || null,
        passwordHash,
      })
      try {
        const savedUser = await user.save()
        return savedUser
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash)
      if (!(user && passwordCorrect))
        throw new UserInputError('Invalid name or password')
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, SECRET) }
    },
  },
}

module.exports = resolvers
