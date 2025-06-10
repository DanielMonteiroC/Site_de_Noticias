describe('Testes de Autenticação', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearSessionStorage();
    });

    it('Deve permitir que um novo usuário se cadastre com sucesso', () => {
        cy.visit('register.html'); //
        const randomEmail = `testuser${Date.now()}@example.com`;
        cy.get('#name').type('Usuário de Teste'); //
        cy.get('#email').type(randomEmail); //
        cy.get('#password').type('senha123'); //
        cy.get('button[type="submit"]').click(); //
        cy.url().should('include', '/login.html');
    });

    it('Deve exibir um alerta se o e-mail de cadastro já existir', () => {
        const existingEmail = 'usuario.existente@teste.com';
        const users = [{ name: 'Usuario Existente', email: existingEmail, password: 'password' }];
        localStorage.setItem('users', JSON.stringify(users));
        cy.visit('register.html');
        cy.get('#name').type('Outro Usuario');
        cy.get('#email').type(existingEmail);
        cy.get('#password').type('outrasenha');
        cy.get('button[type="submit"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Este e-mail já está cadastrado!'); //
        });
    });

    it('Deve permitir que um usuário cadastrado faça login com sucesso', () => {
        const user = { name: 'Login Test', email: 'login@teste.com', password: '123' };
        localStorage.setItem('users', JSON.stringify([user]));
        cy.visit('login.html'); //
        cy.get('#email').type(user.email); //
        cy.get('#password').type(user.password); //
        cy.get('button[type="submit"]').click(); //
        cy.url().should('include', '/index.html');
        cy.get('.welcome-message').should('contain.text', `Olá, ${user.name}`); //
    });

    it('Deve fazer logout corretamente', () => {
        const user = { name: 'Test Logout', email: 'logout@test.com' };
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        cy.visit('index.html');
        cy.get('button.auth-button').contains('Sair').click(); //
        cy.url().should('include', '/login.html');
    });
});