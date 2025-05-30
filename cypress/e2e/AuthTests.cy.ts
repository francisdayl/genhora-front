const testToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InV1aWQtYXNpZG9pMTIiLCJ1c2VyTmFtZSI6IkpvaG5Eb2UiLCJlbWFpbCI6IkpvaG5Eb2VAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJBZG1pbiJdfQ.PuD7ckMGaXpYgrfnY_tRlOmaw8hFfdTQsaoMsPwZPU4'

describe('template spec', () => {
  it('redirects by default to login page', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('[data-testid="email-input"]').should('exist')
    cy.get('[data-testid="password-input"]').should('exist')
  })
  
  it('should successfully log in  and log out', () => {
    // Intercept API requests to the login endpoint
    cy.intercept('POST', '/auth/login', {
      statusCode: 200,
      body:{accessToken: testToken,}
    }).as('loginSuccess');
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="email-input"]').type('example@example.com');
    cy.get('[data-testid="password-input"]').type('My123password');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginSuccess').its('response.statusCode').should('eq', 200);
    cy.wait(1000)
    
    cy.url().should(url => {
      expect(url).to.include('/dashboard');
    });
    cy.get('[data-testid="user-mail"]').should('have.text','JohnDoe@example.com');

    cy.get('[data-testid="sign-out"]').should('exist');
    cy.get('[data-testid="sign-out"]').should('exist').click();

    cy.url().should('include', '/login');
    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).to.not.have.property('auth_token');
    }
    )

  })
})