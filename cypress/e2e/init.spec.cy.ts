describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/')
    cy.findByText(/enter/i).click()
    cy.findByText(/welcome/i).should('exist')
  })
})
