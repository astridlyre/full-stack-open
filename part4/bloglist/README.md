## Blog List Exercise

#### 4.1 - 4.2

Built blog list application that allows users to save information about interesting blogs. Each entry contains Title, Author, URL and number of Likes. The application is organized into separate modules.

#### 4.3

Set up initial test with a dummy function. It worked!

#### 4.4 - 4.7

Added some helper tests. I didn't use Lodash for the last two exercises.

#### 4.8 - 4.12

Created blog list tests using Jest and supertest. Verified that blog list app returns correct number of blogs in JSON format. Verified the unique identifier is called "id" and that each blog entry has an id. Verified that making an HTTP POST request successfully creates a new blog entry. Verified that submitting a blog entry with likes results in a new entry with the default of 0 likes. Verified that if entry is missing title or url it is rejected with status code 400 Bad Request.

#### 4.13 - 4.14

Implemented functionality for deleting and updating posts (and tests).

#### 4.15

Can create users by POST request to /api/users. Users have username, password and name. Passwords are not saved to the database, but rather hashed with bcrypt.

#### 4.16

Username and password are required, username must be at least 3 chars and password must be at least 5. Implemented tests to check operations have desired results.

#### 4.17 - 4.19

Populated blogs with user who created them. Implemented token-based authentication. Users can only add a new blog entry if they have a valid token.

#### 4.20 - 4.22

Refactored the token into middleware. Changed the delete blog operation so the blog can only be deleted by the user who created it. Fixed the tests to return proper status codes when trying to add a blog entry. Tried to also implement this for deleting, but not successful yet.
