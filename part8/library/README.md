## Part 8

#### Exercises 8.1 - 8.7

Implemented queries to **bookCount** and **authorCount** which return the number of books and authors. Implemented allBooks, which returns details of all the books. Implemented **allAuthors**, which includes a book count. Modified **allBooks** to accept optional param _author_ to return only books by that author. Modified **allBooks** to search for genres too. Implemented **addBook** functionality. Implemented mutation **editAuthor** which can be used to set birth year for author.

#### Exercises 8.13 - 8.16

Changed the library app to save the data to a database. All queries including **allBooks** with the parameter _author_. Database validation errors are now handled sensibly - throwing a _UserInputError_ with a suitable error message. Added user management to the app.
