const testTokenPosts = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6InV1aWQtYXNpZG9pMTIiLCJ1c2VyTmFtZSI6IkpvaG5Eb2UiLCJlbWFpbCI6IkpvaG5Eb2VAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJBZG1pbiJdfQ.PuD7ckMGaXpYgrfnY_tRlOmaw8hFfdTQsaoMsPwZPU4'
describe('posts tests', () => {
  beforeEach(() => { 
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.localStorage.setItem('auth_token', testTokenPosts);
    });
  })
  it('should show the posts page with some posts', () => {
    cy.visit("http://localhost:5173/posts")
    cy.get('[data-testid="posts-container"]').should('exist')
    cy.get('[data-testid="posts-container"]').children().should('have.length.greaterThan', 0)
  })
  it('should navigate to post detail page', () => {
    cy.visit("http://localhost:5173/posts")
    cy.get('[data-testid="post-card-1"]').should('exist')
    cy.get('[href="/posts/1"]').click()
    cy.url().should('include', '/posts/')

  })
  it('should show the detail info of the posts', () => {
    cy.visit("http://localhost:5173/posts/1")
    cy.get('[data-testid="post-card-1"]').should('exist')
    cy.get('[href="/posts/1"]').should('not.exist')
    cy.get('[data-testid="related-posts-container"]').children().should('have.length.greaterThan', 1)
  })
})