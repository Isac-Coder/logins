const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('message');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.style.borderColor = '#ff6b6b';
    input.style.background = 'rgba(255, 107, 107, 0.1)';
}

function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.style.borderColor = 'rgba(102, 126, 234, 0.2)';
    input.style.background = 'rgba(255, 255, 255, 0.05)';
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
        const btnText = btn.querySelector('span');
        btn.disabled = true;

        btnText.textContent = 'Verificando...';

        setTimeout(() => {
            messageDiv.textContent = '✓ ¡Sesión iniciada correctamente!';
            messageDiv.classList.add('success');
            
            console.log('Login exitoso:', {
                email: emailInput.value
            });

            setTimeout(() => {
                form.reset();
                btn.disabled = false;
                btnText.textContent = 'Iniciar Sesión';
                messageDiv.classList.remove('success');
                
                if (passwordInput.type === 'text') {
                    passwordInput.type = 'password';
                    togglePasswordBtn.querySelector('i').classList.remove('fa-eye-slash');
                    togglePasswordBtn.querySelector('i').classList.add('fa-eye');
                }
            }, 2000);
        }, 1500);
    }
});

// Efectos de rizado en botones sociales
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(102, 126, 234, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Añadir animación CSS para ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
