document.addEventListener('DOMContentLoaded', () => {

    // Elementos del sistema de Login
    const loginScreen = document.getElementById('login-screen');
    const appScreen = document.getElementById('app-screen');
    const btnEnter = document.getElementById('btn-enter');
    const btnLogout = document.getElementById('btn-logout');

    // Elementos de la Navegación por Pestañas
    const navLinks = document.querySelectorAll('.nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const headerTitle = document.getElementById('header-title');

    // Transición inicial: Login -> App
    if (btnEnter && loginScreen && appScreen) {
        btnEnter.addEventListener('click', () => {
            loginScreen.classList.remove('active');
            loginScreen.classList.add('hidden');

            appScreen.classList.remove('hidden');
            setTimeout(() => {
                appScreen.classList.add('active');
            }, 50);
        });
    }

    // Lógica Segura de Intercambio de Pestañas
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Si ya está activa la pestaña actual, no recalcular
            if (link.classList.contains('active')) return;

            // Desactivar todos los accesos del menú
            navLinks.forEach(item => item.classList.remove('active'));

            // Ocultar de forma limpia todos los contenedores de vistas
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.classList.add('hidden');
            });

            // Activar enlace seleccionado
            link.classList.add('active');

            // Leer destino y activarlo
            const targetId = link.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            const targetTitle = link.getAttribute('data-title');

            if (headerTitle && targetTitle) {
                headerTitle.textContent = targetTitle;
            }

            if (targetPane) {
                targetPane.classList.remove('hidden');
                targetPane.classList.add('active');
            }
        });
    });

    // Cierre de sesión (Vuelve a pantalla de Login)
    if (btnLogout && loginScreen && appScreen) {
        btnLogout.addEventListener('click', () => {
            appScreen.classList.remove('active');
            appScreen.classList.add('hidden');

            loginScreen.classList.remove('hidden');
            setTimeout(() => {
                loginScreen.classList.add('active');
            }, 50);

            // Resetea a la pestaña inicial (Inicio) automáticamente
            const firstTab = document.querySelector('.nav-link[data-target="tab-inicio"]');
            if (firstTab) firstTab.click();
        });
    }

    // Manejador de Tabs de Categorías Internas
    const categoryTabs = document.querySelectorAll('.cat-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const container = tab.parentElement;
            if (container) {
                container.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            }
        });
    });
});