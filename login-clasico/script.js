const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('message');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Validación de email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar error
function showError(input, errorElement, message) {
    input.classList.add('error-input');
    errorElement.textContent = message;
}

// Limpiar error
function clearError(input, errorElement) {
    input.classList.remove('error-input');
    errorElement.textContent = '';
}

// Validar inputs
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

// Envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar errores previos
    messageDiv.classList.remove('success', 'error');

    // Validar
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
        // Simular login
        messageDiv.textContent = '✓ ¡Iniciando sesión...';
        messageDiv.classList.add('success');
        
        setTimeout(() => {
            messageDiv.textContent = '✓ Sesión iniciada correctamente';
            console.log('Login:', {
                email: emailInput.value,
                password: '****'
            });
        }, 500);

        // Limpiar formulario después de 2 segundos
        setTimeout(() => {
            form.reset();
            messageDiv.classList.remove('success');
        }, 2000);
    }
});

// Limpiar error cuando el usuario empieza a escribir
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error-input')) {
        clearError(emailInput, emailError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error-input')) {
        clearError(passwordInput, passwordError);
    }
});
