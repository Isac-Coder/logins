const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const messageDiv = document.getElementById('message');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.style.borderColor = '#ff6b6b';
}

function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
}

emailInput.addEventListener('blur', () => {
    if (!emailInput.value) {
        showError(emailInput, emailError, 'El email es requerido');
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Email inválido');
    } else {
        clearError(emailInput, emailError);
    }
});

passwordInput.addEventListener('blur', () => {
    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'La contraseña es requerida');
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError, 'Mínimo 6 caracteres');
    } else {
        clearError(passwordInput, passwordError);
    }
});

emailInput.addEventListener('input', () => {
    if (emailError.textContent) {
        clearError(emailInput, emailError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordError.textContent) {
        clearError(passwordInput, passwordError);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    messageDiv.classList.remove('success', 'error');

    let isValid = true;

    if (!emailInput.value) {
        showError(emailInput, emailError, 'El email es requerido');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Email inválido');
        isValid = false;
    } else {
        clearError(emailInput, emailError);
    }

    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'La contraseña es requerida');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, passwordError, 'Mínimo 6 caracteres');
        isValid = false;
    } else {
        clearError(passwordInput, passwordError);
    }

    if (isValid) {
        const btn = form.querySelector('.btn-login');
        btn.disabled = true;

        setTimeout(() => {
            messageDiv.textContent = '✓ ¡Sesión iniciada correctamente!';
            messageDiv.classList.add('success');
            
            console.log('Login exitoso:', {
                email: emailInput.value
            });

            setTimeout(() => {
                form.reset();
                btn.disabled = false;
                messageDiv.classList.remove('success');
                
                if (passwordInput.type === 'text') {
                    passwordInput.type = 'password';
                    togglePasswordBtn.querySelector('i').classList.remove('fa-eye-slash');
                    togglePasswordBtn.querySelector('i').classList.add('fa-eye');
                }
            }, 2000);
        }, 800);
    }
});
