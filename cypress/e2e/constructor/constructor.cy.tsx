describe('тесты страницы с конструктором бургера', function () {
  this.beforeEach(() => {
    cy.fixture('ingredients.json').then((json) => {
      cy.intercept('GET', 'api/ingredients', json);
    });
    cy.visit('/');
    cy.get('[data-cy="top_bun"]').as('top_bun');
    cy.get('[data-cy="bottom_bun"]').as('bottom_bun');
    cy.get('[data-cy="buns"]').as('buns');
    cy.get('[data-cy="ingredient"]').as('ingredient');
    cy.get('[data-cy="mains"]').as('mains');
    cy.get('[data-cy="sauces"]').as('sauces');
  });
  it('тест добавления булки в бургер', function () {
    cy.get('@top_bun').contains("Краторная булка N-200i").should('not.exist');
    cy.get('@bottom_bun').contains("Краторная булка N-200i").should('not.exist');
    cy.get('@buns').contains('Добавить').click();
    cy.get('@top_bun').contains("Краторная булка N-200i").should('exist');
    cy.get('@bottom_bun').contains("Краторная булка N-200i").should('exist');
  });
  it('тест добавления ингредиентов в бургер', function () {
    cy.get('@ingredient').contains("Биокотлета из марсианской Магнолии").should('not.exist');
    cy.get('@ingredient').contains("Соус Spicy-X").should('not.exist');
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();
    cy.get('@ingredient').contains("Биокотлета из марсианской Магнолии").should('exist');
    cy.get('@ingredient').contains("Соус Spicy-X").should('exist');
  });
});
