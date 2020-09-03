## Blog List Exercise

#### 4.1 - 4.2

Built blog list application that allows users to save information about interesting blogs. Each entry contains Title, Author, URL and number of Likes. The application is organized into separate modules.

#### 4.3

Set up initial test with a dummy function. It worked!

#### 4.4 - 4.7

Added some helper tests. I didn't use Lodash for the last two exercises.

#### 4.8 - 4.12

Created blog list tests using Jest and supertest. Verified that blog list app returns correct number of blogs in JSON format. Verified the unique identifier is called "id" and that each blog entry has an id. Verified that making an HTTP POST request successfully creates a new blog entry. Verified that submitting a blog entry with likes results in a new entry with the default of 0 likes. Verified that if entry is missing title or url it is rejected with status code 400 Bad Request.
