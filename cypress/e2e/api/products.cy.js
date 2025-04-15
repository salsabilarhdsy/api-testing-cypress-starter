// cypress/e2e/api/products.cy.js

describe('Products API', () => {
  before(() => {
    cy.loginAPI().then(() => { // using default username and password, add parameter if needed
      const token = Cypress.env('token')
      console.log('Token After Login:', token)  // Check console
      expect(token).to.not.be.empty // Make sure token is not empty
    })
  })

  it('GET all products', () => {
    cy.request({
      method: 'GET',
      url: '/products',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('products')
      expect(res.body.products).to.be.an('array')
      expect(res.body.products).to.have.lengthOf.at.least(1)
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.duration).to.be.within(0, 1000)
    })
  })

  it('POST add a product', () => {
    const newProduct = {
      title: 'Test Product',
      price: 99,
      category: 'smartphones',
    }

    cy.request({
      method: 'POST',
      url: '/products/add',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
      body: newProduct,
    }).then((res) => {
      expect(res.status).to.equal(201)
      expect(res.body).to.deep.contain(newProduct)
      expect(res.body).to.have.property('id')
      expect(res.body.id).to.be.a('number')
    })
  })

  it('PUT update a product', () => {
    cy.request({
      method: 'PUT',
      url: '/products/1',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
      body: {
        title: 'Updated Product',
      },
    }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body.title).to.equal('Updated Product')
      expect(res.body.title).to.be.a('string')
      expect(res.body).to.include({ id: 1 })
    })
  })

  it('DELETE a product', () => {
    cy.request({
      method: 'DELETE',
      url: '/products/1',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('id', 1)
      expect(res.body.isDeleted).to.be.true
    })
  })
})