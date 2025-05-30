import { MemoryRouter } from "react-router-dom"
import PostCard from "@components/PostCard"

describe('postComponent.cy.tsx', () => {
  it('validates the visibility rules of the post component', () => {
    cy.mount(<MemoryRouter> <PostCard post={{ id: 1, title: 'Test Post', body: 'This is a test post.', userId: 1 }} showLink={true} /></MemoryRouter>)
    cy.get('[data-testid="post-card-1"]').should('exist')
    cy.get('[data-testid="post-card-1"]').should('contain', 'Test Post')
    cy.get('[data-testid="post-card-1"]').should('contain', 'This is a test post.')

    cy.get('a').contains('Read more').should('exist')
  })

  it('validates the visibility rules of the post component', () => {
    cy.mount(<MemoryRouter> <PostCard post={{ id: 1, title: 'Test Post', body: 'This is a test post.', userId: 1 }} showLink={false} /></MemoryRouter>)
    cy.get('[data-testid="post-card-1"]').should('exist')
    cy.get('[data-testid="post-card-1"]').should('contain', 'Test Post')
    cy.get('[data-testid="post-card-1"]').should('contain', 'This is a test post.')

    cy.get('a').should('not.exist')
  })
})