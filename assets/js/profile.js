class ProfileManager {
    constructor() {
        this.user = null;
        this.changePasswordForm = document.getElementById('change-password-form');
        this.changeNameForm = document.getElementById('change-name-form');
        this.logoutLink = document.getElementById('logout-link');
        this.searchHistoryContainer = document.getElementById('search-history');
        this.clearHistoryButton = document.getElementById('clear-history');
    }

    init() {
        this.loadUser();
        this.bindEvents();
        this.displaySearchHistory(); 
        this.clearHistoryButton.addEventListener('click', this.clearSearchHistory.bind(this));
    }

    loadUser() {
        const userData = this.getCookie('user');
        if (userData) {
            this.user = JSON.parse(userData);
            this.displayUserInfo();
        } else {
            alert('Вы не авторизованы');
            window.location = './login.html';
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
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

        if (newPassword.length() < 8 || confirmNewPassword.length() < 8) {
            alert('Слишком короткий пароль');
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
                this.setCookie('user', JSON.stringify(this.user), 1); 
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
        this.setCookie('updatedName', newName, 1); 
    }

    handleLogout(event) {
        event.preventDefault();

        this.setCookie('user', '', -1); 
        this.setCookie('updatedName', '', -1); 

        alert('Вы вышли из аккаунта');
        window.location = './index.html';
    }

    displaySearchHistory() {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        this.searchHistoryContainer.innerHTML = '';
    
        if (history.length === 0) {
          const message = document.createElement('li');
          message.textContent = 'История поиска пуста';
          this.searchHistoryContainer.appendChild(message);
          return;
        }
    
        history.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `Маршрут: ${item.name} (id: ${item.id}), Посещён: ${new Date(item.timestamp).toLocaleString()}`;
          this.searchHistoryContainer.appendChild(listItem);
        });
    }

    updateSearchHistory(item) {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        const existingItemIndex = history.findIndex(h => h.id === item.id);

        if (existingItemIndex !== -1) {
            history[existingItemIndex].timestamp = new Date().toISOString();
        } else {
            history.push({
                id: item.id,
                name: item.name,
                timestamp: new Date().toISOString()
            });
        }

        localStorage.setItem('searchHistory', JSON.stringify(history));
        this.displaySearchHistory();
    }

    clearSearchHistory() {
        localStorage.removeItem('searchHistory');
        this.displaySearchHistory();
        alert('История поиска очищена');
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