const loginForm = document.getElementById('loginFrm');
const signupForm = document.getElementById('signupFrm');
const messageDiv = document.getElementById('message');

function toggleForms() {
    const loginFormEl = document.querySelector('.login-form');
    const signupFormEl = document.querySelector('.signup-form');
    
    loginFormEl.classList.toggle('active');
    signupFormEl.classList.toggle('active');
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(input, errorElement, message) {
    input.style.borderColor = '#e74c3c';
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input.style.borderColor = '#e0e0e0';
    errorElement.textContent = '';
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
        messageDiv.classList.remove('success', 'error');
    }, 3000);
}

// Login Form Validation
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const loginEmailError = document.getElementById('loginEmailError');
const loginPasswordError = document.getElementById('loginPasswordError');

loginEmailInput.addEventListener('blur', () => {
    if (!loginEmailInput.value) {
        showError(loginEmailInput, loginEmailError, 'El email es requerido');
    } else if (!validateEmail(loginEmailInput.value)) {
        showError(loginEmailInput, loginEmailError, 'Email inválido');
    } else {
        clearError(loginEmailInput, loginEmailError);
    }
});

loginPasswordInput.addEventListener('blur', () => {
    if (!loginPasswordInput.value) {
        showError(loginPasswordInput, loginPasswordError, 'La contraseña es requerida');
    } else if (loginPasswordInput.value.length < 6) {
        showError(loginPasswordInput, loginPasswordError, 'Mínimo 6 caracteres');
    } else {
        clearError(loginPasswordInput, loginPasswordError);
    }
});

loginEmailInput.addEventListener('input', () => {
    if (loginEmailError.textContent) {
        clearError(loginEmailInput, loginEmailError);
    }
});

loginPasswordInput.addEventListener('input', () => {
    if (loginPasswordError.textContent) {
        clearError(loginPasswordInput, loginPasswordError);
    }
});

// Signup Form Validation
const signupNameInput = document.getElementById('signupName');
const signupEmailInput = document.getElementById('signupEmail');
const signupPasswordInput = document.getElementById('signupPassword');
const signupConfirmInput = document.getElementById('signupConfirmPassword');
const signupNameError = document.getElementById('signupNameError');
const signupEmailError = document.getElementById('signupEmailError');
const signupPasswordError = document.getElementById('signupPasswordError');
const signupConfirmError = document.getElementById('signupConfirmError');

signupNameInput.addEventListener('blur', () => {
    if (!signupNameInput.value) {
        showError(signupNameInput, signupNameError, 'El nombre es requerido');
    } else if (signupNameInput.value.length < 3) {
        showError(signupNameInput, signupNameError, 'Mínimo 3 caracteres');
    } else {
        clearError(signupNameInput, signupNameError);
    }
});

signupEmailInput.addEventListener('blur', () => {
    if (!signupEmailInput.value) {
        showError(signupEmailInput, signupEmailError, 'El email es requerido');
    } else if (!validateEmail(signupEmailInput.value)) {
        showError(signupEmailInput, signupEmailError, 'Email inválido');
    } else {
        clearError(signupEmailInput, signupEmailError);
    }
});

signupPasswordInput.addEventListener('blur', () => {
    if (!signupPasswordInput.value) {
        showError(signupPasswordInput, signupPasswordError, 'La contraseña es requerida');
    } else if (signupPasswordInput.value.length < 6) {
        showError(signupPasswordInput, signupPasswordError, 'Mínimo 6 caracteres');
    } else {
        clearError(signupPasswordInput, signupPasswordError);
    }
});

signupConfirmInput.addEventListener('blur', () => {
    if (!signupConfirmInput.value) {
        showError(signupConfirmInput, signupConfirmError, 'Debe confirmar la contraseña');
    } else if (signupConfirmInput.value !== signupPasswordInput.value) {
        showError(signupConfirmInput, signupConfirmError, 'Las contraseñas no coinciden');
    } else {
        clearError(signupConfirmInput, signupConfirmError);
    }
});

// Clear errors on input
[signupNameInput, signupEmailInput, signupPasswordInput, signupConfirmInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input === signupNameInput && signupNameError.textContent) {
            clearError(signupNameInput, signupNameError);
        }
        if (input === signupEmailInput && signupEmailError.textContent) {
            clearError(signupEmailInput, signupEmailError);
        }
        if (input === signupPasswordInput && signupPasswordError.textContent) {
            clearError(signupPasswordInput, signupPasswordError);
        }
        if (input === signupConfirmInput && signupConfirmError.textContent) {
            clearError(signupConfirmInput, signupConfirmError);
        }
    });
});

// Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate login email
    if (!loginEmailInput.value) {
        showError(loginEmailInput, loginEmailError, 'El email es requerido');
        isValid = false;
    } else if (!validateEmail(loginEmailInput.value)) {
        showError(loginEmailInput, loginEmailError, 'Email inválido');
        isValid = false;
    } else {
        clearError(loginEmailInput, loginEmailError);
    }

    // Validate login password
    if (!loginPasswordInput.value) {
        showError(loginPasswordInput, loginPasswordError, 'La contraseña es requerida');
        isValid = false;
    } else if (loginPasswordInput.value.length < 6) {
        showError(loginPasswordInput, loginPasswordError, 'Mínimo 6 caracteres');
        isValid = false;
    } else {
        clearError(loginPasswordInput, loginPasswordError);
    }

    if (isValid) {
        showMessage('✓ ¡Sesión iniciada correctamente!', 'success');
        console.log('Login:', {
            email: loginEmailInput.value
        });
        
        setTimeout(() => {
            loginForm.reset();
        }, 1500);
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate name
    if (!signupNameInput.value) {
        showError(signupNameInput, signupNameError, 'El nombre es requerido');
        isValid = false;
    } else if (signupNameInput.value.length < 3) {
        showError(signupNameInput, signupNameError, 'Mínimo 3 caracteres');
        isValid = false;
    } else {
        clearError(signupNameInput, signupNameError);
    }

    // Validate email
    if (!signupEmailInput.value) {
        showError(signupEmailInput, signupEmailError, 'El email es requerido');
        isValid = false;
    } else if (!validateEmail(signupEmailInput.value)) {
        showError(signupEmailInput, signupEmailError, 'Email inválido');
        isValid = false;
    } else {
        clearError(signupEmailInput, signupEmailError);
    }

    // Validate password
    if (!signupPasswordInput.value) {
        showError(signupPasswordInput, signupPasswordError, 'La contraseña es requerida');
        isValid = false;
    } else if (signupPasswordInput.value.length < 6) {
        showError(signupPasswordInput, signupPasswordError, 'Mínimo 6 caracteres');
        isValid = false;
    } else {
        clearError(signupPasswordInput, signupPasswordError);
    }

    // Validate confirm password
    if (!signupConfirmInput.value) {
        showError(signupConfirmInput, signupConfirmError, 'Debe confirmar la contraseña');
        isValid = false;
    } else if (signupConfirmInput.value !== signupPasswordInput.value) {
        showError(signupConfirmInput, signupConfirmError, 'Las contraseñas no coinciden');
        isValid = false;
    } else {
        clearError(signupConfirmInput, signupConfirmError);
    }

    if (isValid) {
        showMessage('✓ ¡Cuenta creada correctamente!', 'success');
        console.log('Signup:', {
            name: signupNameInput.value,
            email: signupEmailInput.value
        });
        
        setTimeout(() => {
            signupForm.reset();
        }, 1500);
    }
});
