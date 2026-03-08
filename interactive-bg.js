// Script global de fondo interactivo para todos los logins

document.addEventListener('DOMContentLoaded', () => {
    // Fondo interactivo con seguimiento del mouse
    document.addEventListener('mousemove', (e) => {
        const body = document.body;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        const beforePseudo = body.style.setProperty('--mouse-x', x + '%');
        body.style.setProperty('--mouse-y', y + '%');
    });

    // Efecto de click - ondas de expansión
    document.addEventListener('click', (e) => {
        if (e.target.closest('.login-form') || e.target.closest('form')) {
            return; // No crear ripple dentro de formularios
        }
        
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '1px';
        ripple.style.height = '1px';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'bgRipple 1.5s ease-out forwards';
        ripple.style.zIndex = '-1';
        
        // Obtener el color dominante del fondo
        const computedStyle = window.getComputedStyle(document.body);
        const bgColor = computedStyle.backgroundImage || computedStyle.backgroundColor;
        ripple.style.background = 'rgba(255, 255, 255, 0.15)';
        
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1500);
    });

    // Agregar estilos para animaciones
    if (!document.querySelector('style[data-interactive-bg]')) {
        const style = document.createElement('style');
        style.setAttribute('data-interactive-bg', 'true');
        style.textContent = `
            @keyframes bgRipple {
                from {
                    width: 1px;
                    height: 1px;
                    opacity: 1;
                    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
                }
                to {
                    width: 400px;
                    height: 400px;
                    opacity: 0;
                    box-shadow: 0 0 0 100px rgba(255, 255, 255, 0);
                }
            }

            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0);
                }
                33% {
                    transform: translate(30px, -50px);
                }
                66% {
                    transform: translate(-20px, 20px);
                }
            }

            body::before,
            body::after {
                animation: float 20s ease-in-out infinite !important;
            }
        `;
        document.head.appendChild(style);
    }
});
