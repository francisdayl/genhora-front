describe('Auth spec', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })
  it('redirects by default to login page', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[data-testid="email-input"]').should('exist')
  })

  it('should successfully log in  and log out', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="email-input"]').type('dfyanez@espol.edu.ec');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="user-mail"]').should('have.text', 'Hola, dfyanez@espol.edu.ec');

    cy.get('[data-testid="sign-out"]').should('exist');
    cy.get('[data-testid="sign-out"]').should('exist').click();

    cy.url().should('include', '/login');
    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).to.not.have.property('auth-storage');
    }
    )
  })

  it('should not let users out of espol to login', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="email-input"]').type('dfyanez@ucsg.edu.ec');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email-error"]').should('have.text', 'Invalid email');

    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).to.not.have.property('auth-storage');
    }
    )
  })

  it('should not allow espol emails with numbers', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="email-input"]').type('dfyanez123@espol.edu.ec');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email-error"]').should('have.text', 'Invalid email');

    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).to.not.have.property('auth-storage');
    }
    )
  })

  it('should not accept espol long emails', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="email-input"]').type('dfyanezdfyanezdfyanezdfyanez@espol.edu.ec');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email-error"]').should('have.text', 'Invalid email');

    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).to.not.have.property('auth-storage');
    }
    )
  })


})