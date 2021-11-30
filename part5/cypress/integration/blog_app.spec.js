const { listenerCount } = require("../../../part4/models/blog")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    
      cy.contains('Matti Luukkainen logged in')
    
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
    
      cy.get('.error').should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Sapiens')
      cy.get('#author').type('Yuval Harari')
      cy.get('#url').type('https://ynharari.com/book/sapiens-2')
      cy.get('#create-button').click()
      cy.contains('Sapiens')  
    })

    describe('and a blog exists', function () {
      describe('and several blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'Jun Sung', author: 'Jun Sung Lee', url: 'https://junsunglee.com', likes: 100 })
          cy.createBlog({ title: 'Thoughts and Ideas', author: 'Matt Lind', url: 'https://matthewcliend.com', likes: 10 })
          cy.createBlog({ title: 'Technology For Liberty', author: 'Matt Lind', url: 'https://technologyforliberty.com', likes: 1 })
        })
  
        it('one of those can be liked', function () {
          cy.contains('Jun Sung').click()
          cy.contains('view').click()
          cy.contains('100')
          cy.get('#like-button').click()
          cy.contains('101')
        })

        it('user who created a blog can delete it', function() {
          cy.contains('Jun Sung').click()
          cy.contains('view').click()
          cy.get('#delete-button').click()
          cy.get('.error').should('contain', 'Jun Sung was successfully deleted')
        })
      })
    })
  })
})