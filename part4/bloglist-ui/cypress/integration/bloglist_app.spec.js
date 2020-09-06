describe('Bloglist app', function () {
  describe('page can be visited', () => {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
      cy.contains('Get started')
      cy.contains('username')
    })

    it('create account form can be opened', function () {
      cy.get('#createaccount').click()
    })

    it('new user can be created', function () {
      cy.get('#createaccount').click()
      cy.get('#name').type('test name')
      cy.get('#username').type('cytestuser')
      cy.get('#password').type('testing')
      cy.get('#signup').click()
    })
  })

  describe('Bloglist login works', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset', {})
      cy.request('POST', 'http://localhost:3001/api/users', {
        username: 'cytestuser',
        password: 'testing',
        name: 'cytestuser',
      })
      cy.visit('http://localhost:3000')
    })

    it('can login', function () {
      cy.get('#username').type('cytestuser')
      cy.get('#password').type('testing')
      cy.get('#login').click()
      cy.get('html').contains('hi cytestuser')
    })

    it('cannot login with wrong password', function () {
      cy.get('#username').type('cytestuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login').click()
      cy.get('html').should('not.contain', 'hi cytestuser')
    })
  })

  describe('cannot create user with preexisting username', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset', {})
      const user = {
        username: 'cytestuser',
        password: 'testing',
        name: 'test name',
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })

    it('new user can not be created', function () {
      cy.get('#createaccount').click()
      cy.get('#name').type('test name')
      cy.get('#username').type('cytestuser')
      cy.get('#password').type('testing')
      cy.get('#signup').click()
      cy.get('html').contains('username already taken')
    })
  })

  describe('can create then delete a post when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset', {})
      cy.login({ username: 'cytestuser', password: 'testing' })
    })

    it('a new blog entry can be created then deleted', function () {
      cy.get('#createmodal-open').click()
      cy.get('#createmodal-title').type('test blog title')
      cy.get('#createmodal-author').type('test author')
      cy.get('#createmodal-url').type('htttp://www.test.com')
      cy.get('#createmodal-submit').click()
      cy.contains('test blog title')

      cy.get('.showdelete-btn').click()
      cy.get('.delete-btn').click()
      cy.get('html').should('not.contain', 'test blog title')
    })
  })

  describe('when logged in and a blog entry exists', () => {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset', {})
      cy.login({ username: 'cytestuser', password: 'testing' })
      cy.createBlogEntry({
        title: 'test title',
        author: 'test author',
        url: 'test url',
      })
      cy.visit('http://localhost:3000')
    })

    it('it can be liked', function () {
      cy.get('.like-btn').click()
      cy.contains('1 like')
    })

    it('it can not be liked more than once', function () {
      cy.get('.like-btn').click()
      cy.contains('1 like')
      cy.get('.like-btn').click()
      cy.contains('0 likes')
    })
  })

  describe('when logged in and more than one blog entry exists', () => {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset', {})
      cy.login({ username: 'cytestuser', password: 'testing' })
      cy.createBlogEntry({
        title: 'test title 1',
        author: 'test author 1',
        url: 'test url 1',
      })
      cy.createBlogEntry({
        title: 'test title 2',
        author: 'test author 2',
        url: 'test url 2',
      })
      cy.createBlogEntry({
        title: 'test title 3',
        author: 'test author 3',
        url: 'test url 3',
      })
      cy.visit('http://localhost:3000')
    })

    it.only('when liking a post then sorting by likes, correct post is first', function () {
      cy.contains('test author 1').next().children('.like-btn').click()
      cy.contains('1 like')
      cy.get('li:first').should('not.contain', '1 like')
      cy.get('#filter-liked').click()
      cy.get('li:first').contains('1 like')
    })
  })
})
