describe('тесты модальных окон', function() {
    this.beforeEach(() => {
        cy.fixture('ingredients.json').then((json) => {
          cy.intercept('GET', 'api/ingredients', json);
        });
        cy.visit('http://localhost:4000/');
      });

    const modalDataCy = '[data-cy="modal"]';
    const bunsDataCy = '[data-cy="buns"]';
    it('тест открытия модального окна ингредиента', function() {
        cy.get(modalDataCy).should('not.exist');
        cy.get(bunsDataCy).contains("Краторная булка N-200i").click();
        cy.get(modalDataCy).should('exist');
    });
    it('тест закрытия модального окна нажатием на крестик', function() {
        cy.get(bunsDataCy).contains("Краторная булка N-200i").click();
        cy.get('[data-cy="close"]').click();
        cy.get(modalDataCy).should('not.exist');
    });
    it('тест закрытия модального окна при нажатии на оверлей', function() {
        cy.get(bunsDataCy).contains("Краторная булка N-200i").click();
        cy.get('[data-cy="overlay"]').click('topRight', {force : true});
        cy.get(modalDataCy).should('not.exist');
    })
})