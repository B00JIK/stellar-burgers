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
        cy.visit('http://localhost:4000/');
      });
    this.afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    it('тест добавления ингредиентов и создания заказа', function () {
        cy.get('[data-cy="mains"]').contains('Добавить').click();
        cy.get('[data-cy="buns"]').contains('Добавить').click();
        cy.get('[data-cy="order"]').contains('Оформить заказ').click();
        cy.get('[data-cy="order_number"]').contains('7472').should('exist');
        cy.get('[data-cy="top_bun"]').contains("Краторная булка N-200i").should('not.exist');
        cy.get('[data-cy="ingredient"]').contains("Биокотлета из марсианской Магнолии").should('not.exist');
        cy.get('[data-cy="bottom_bun"]').contains("Краторная булка N-200i").should('not.exist');
    });
})