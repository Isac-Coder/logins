const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const messageDiv = document.getElementById('message');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Validación de email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar/Ocultar contraseña
togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Mostrar error
function showError(input, errorElement, message) {
    input.style.borderColor = '#e74c3c';
    errorElement.textContent = message;
}

// Limpiar error
function clearError(input, errorElement) {
    input.style.borderColor = '#e0e0e0';
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

// Limpiar error cuando el usuario empieza a escribir
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

// Envío del formulario
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
        const btnText = form.querySelector('.btn-login span');
        const btnIcon = form.querySelector('.btn-login i');
        
        btnText.textContent = 'Iniciando...';
        form.querySelector('.btn-login').disabled = true;

        setTimeout(() => {
            messageDiv.textContent = '✓ ¡Sesión iniciada correctamente!';
            messageDiv.classList.add('success');
            
            console.log('Login exitoso:', {
                email: emailInput.value
            });

            setTimeout(() => {
                form.reset();
                btnText.textContent = 'Iniciar Sesión';
                form.querySelector('.btn-login').disabled = false;
                messageDiv.classList.remove('success');
                
                // Restaurar icono
                if (passwordInput.type === 'text') {
                    passwordInput.type = 'password';
                    btnIcon.classList.remove('fa-eye-slash');
                    btnIcon.classList.add('fa-eye');
                }
            }, 2000);
        }, 1000);
    }
});

// Efectos de rizado en los botones sociales
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
