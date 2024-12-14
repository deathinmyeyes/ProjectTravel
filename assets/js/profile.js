class ProfileManager {
    constructor() {
        this.user = null;
        this.changePasswordForm = document.getElementById('change-password-form');
        this.changeNameForm = document.getElementById('change-name-form');
        this.logoutLink = document.getElementById('logout-link');
    }

    init() {
        this.loadUser();
        this.bindEvents();
    }

    loadUser() {
        const userData = localStorage.getItem('user');
        if (userData) {
            this.user = JSON.parse(userData);
            this.displayUserInfo();
        } else {
            alert('Вы не авторизованы');
            window.location = './login.html';
        }
    }

    displayUserInfo() {
        document.getElementById('user-name').textContent = this.user.name;
        document.getElementById('user-email').textContent = this.user.email;
    }

    bindEvents() {
        this.changePasswordForm.addEventListener('submit', this.handlePasswordChange.bind(this));
        this.changeNameForm.addEventListener('submit', this.handleNameChange.bind(this)); 
        this.logoutLink.addEventListener('click', this.handleLogout.bind(this));
    }

    async handlePasswordChange(event) {
        event.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;

        if (newPassword !== confirmNewPassword) {
            alert('Пароли не совпадают');
            return;
        }

        try {
            const response = await fetch(`https://6752c922f3754fcea7b99892.mockapi.io/users/${this.user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword }),
            });

            if (response.ok) {
                alert('Пароль успешно изменен');
                this.changePasswordForm.reset();
            } else {
                alert('Ошибка при смене пароля');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при смене пароля');
        }
    }

    async handleNameChange(event) {
        event.preventDefault();

        const newName = document.getElementById('new-name').value;

        if (!newName) {
            alert('Имя не может быть пустым');
            return;
        }

        try {
            const response = await fetch(`https://6752c922f3754fcea7b99892.mockapi.io/users/${this.user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName }),
            });

            if (response.ok) {
                alert('Имя успешно изменено');
                this.user.name = newName; 
                localStorage.setItem('user', JSON.stringify(this.user)); 
                this.displayUserInfo(); 
                this.updateNameOnMainPage(newName); 
                this.changeNameForm.reset();
            } else {
                alert('Ошибка при смене имени');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при смене имени');
        }
    }

    updateNameOnMainPage(newName) {
        localStorage.setItem('updatedName', newName);
    }

    handleLogout(event) {
        event.preventDefault();

        localStorage.removeItem('user');

        alert('Вы вышли из аккаунта');
        window.location = './index.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileManager = new ProfileManager();
    profileManager.init();
});



class ThemeManager {
    constructor(themeBtnId, styleLinkId) {
        this.themeBtn = document.getElementById(themeBtnId);
        this.styleLink = document.getElementById(styleLinkId);
        this.init();
    }

    init() {
        window.addEventListener('load', this.applySavedTheme.bind(this));
        this.themeBtn.addEventListener('click', this.toggleTheme.bind(this));
    }

    applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.themeBtn.classList.add('dark');
            this.styleLink.setAttribute('href', './css/profile_dark.css');
        } else {
            this.themeBtn.classList.remove('dark');
            this.styleLink.setAttribute('href', './css/profile.css');
        }
    }

    toggleTheme() {
        this.themeBtn.classList.toggle('dark');

        if (this.themeBtn.classList.contains('dark')) {
            this.styleLink.setAttribute('href', './css/profile_dark.css');
            localStorage.setItem('theme', 'dark');
        } else {
            this.styleLink.setAttribute('href', './css/profile.css');
            localStorage.setItem('theme', 'light');
        }
    }
}

const themeManager = new ThemeManager('change_theme', 'style_link');