describe('Testes de Funcionalidades de Notícias', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://newsapi.org/v2/everything?**', {
            fixture: 'news.json'
        }).as('getNews');

        cy.visit('index.html');
    });

    it('Deve carregar as notícias iniciais ao visitar a página', () => {
        cy.wait('@getNews');
        
        cy.get('.container-noticias .item').should('have.length', 5);
        cy.get('.container-noticias').should('contain.text', 'Mais...'); //
    });

    it('Deve buscar notícias de uma categoria específica ao clicar nela', () => {
        cy.get('nav .cat').contains('AI').click(); //
        
        cy.wait('@getNews').its('request.url').should('include', 'intelig%C3%AAncia%2Bartificial');
        
        cy.get('.container-noticias .item').should('have.length', 5);
        cy.get('.container-noticias .item h2').first().should('contain.text', 'Notícia Mock sobre IA');
    });

    it('Deve buscar notícias usando a barra de busca', () => {
        const searchTerm = 'Python';
        cy.get('#procurar').type(searchTerm); //
        cy.get('.procurar button').contains('Buscar').click(); //

        cy.wait('@getNews').its('request.url').should('include', searchTerm);
        
        cy.get('.container-noticias .item').should('have.length', 5);
    });

    it('Deve carregar mais notícias ao clicar no botão "Mais..." (paginação)', () => {
        cy.wait('@getNews');

        cy.get('#btnproximo').click();
        
        cy.wait('@getNews');

        cy.get('.container-noticias .item').should('have.length', 10);
    });
});