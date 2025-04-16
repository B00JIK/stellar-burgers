describe('тесты страницы с конструктором бургера', function () {
  this.beforeEach(() => {
    cy.fixture('ingredients.json').then((json) => {
      cy.intercept('GET', 'api/ingredients', json);
    });
    cy.visit('http://localhost:4000/');
  });
  it('тест добавления булки в бургер', function () {
    cy.get('[data-cy="top_bun"]').contains("Краторная булка N-200i").should('not.exist');
    cy.get('[data-cy="bottom_bun"]').contains("Краторная булка N-200i").should('not.exist');
    cy.get('[data-cy="buns"]').contains('Добавить').click();
    cy.get('[data-cy="top_bun"]').contains("Краторная булка N-200i").should('exist');
    cy.get('[data-cy="bottom_bun"]').contains("Краторная булка N-200i").should('exist');
  });
  it('тест добавления ингредиентов в бургер', function () {
    cy.get('[data-cy="ingredient"]').contains("Биокотлета из марсианской Магнолии").should('not.exist');
    cy.get('[data-cy="ingredient"]').contains("Соус Spicy-X").should('not.exist');
    cy.get('[data-cy="mains"]').contains('Добавить').click();
    cy.get('[data-cy="sauces"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient"]').contains("Биокотлета из марсианской Магнолии").should('exist');
    cy.get('[data-cy="ingredient"]').contains("Соус Spicy-X").should('exist');
  });
});
