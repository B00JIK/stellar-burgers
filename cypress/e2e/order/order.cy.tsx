describe('тест оформления заказа', function() {
    this.beforeEach(() => {
        cy.fixture('ingredients.json').then((json) => {
          cy.intercept('GET', 'api/ingredients', json);
        });
        cy.fixture('user-data.json').then((json) => {
            cy.intercept('GET', '/api/auth/user', json);
        });
        cy.fixture('order-data.json').then((json) => {
            cy.intercept('POST', '/api/orders', json);
        });
        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken')
        );
        cy.setCookie('accessToken', 'test-accessToken');
        cy.visit('/');
        cy.get('[data-cy="mains"]').as('mains');
        cy.get('[data-cy="buns"]').as('buns');
        cy.get('[data-cy="order"]').as('order');
        cy.get('[data-cy="top_bun"]').as('top_bun');
        cy.get('[data-cy="ingredient"]').as('ingredient');
        cy.get('[data-cy="bottom_bun"]').as('bottom_bun');
      });
    this.afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    it('тест добавления ингредиентов и создания заказа', function () {
        cy.get('@mains').contains('Добавить').click();
        cy.get('@buns').contains('Добавить').click();
        cy.get('@order').contains('Оформить заказ').click();
        cy.get('[data-cy="order_number"]').contains('7472').should('exist');
        cy.get('@top_bun').contains("Краторная булка N-200i").should('not.exist');
        cy.get('@ingredient').contains("Биокотлета из марсианской Магнолии").should('not.exist');
        cy.get('@bottom_bun').contains("Краторная булка N-200i").should('not.exist');
    });
})