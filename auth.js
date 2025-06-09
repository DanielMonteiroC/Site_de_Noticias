document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const userExists = users.find(user => user.email === email);
            if (userExists) {
                alert('Este e-mail já está cadastrado!');
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Login bem-sucedido!');
                window.location.href = 'index.html';
            } else {
                alert('E-mail ou senha incorretos.');
            }
        });
    }
});

function logout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

function checkLoginState() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const authContainer = document.getElementById('auth-container');

    if (loggedInUser) {
        authContainer.innerHTML = `
            <span class="welcome-message">Olá, ${loggedInUser.name}</span>
            <button onclick="logout()" class="auth-button">Sair</button>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="login.html"><button class="auth-button">Login</button></a>
            <a href="register.html"><button class="auth-button">Cadastro</button></a>
        `;
    }
}