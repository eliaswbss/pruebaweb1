document.addEventListener('DOMContentLoaded', () => {

    // --- Referencias a DOM ---
    const loginScreen = document.getElementById('login-screen');
    const appScreen = document.getElementById('app-screen');
    const btnEnter = document.getElementById('btn-enter');

    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const headerTitle = document.getElementById('header-title');

    const btnLogout = document.getElementById('btn-logout');

    // --- Lógica de Transiciones ---

    // 1. Login -> App Screen (Sin instalación)
    btnEnter.addEventListener('click', () => {
        loginScreen.classList.remove('active');
        loginScreen.classList.add('hidden');

        appScreen.classList.remove('hidden');
        // Pequeño retraso para permitir el display:block antes de la opacidad
        setTimeout(() => appScreen.classList.add('active'), 50);
    });

    // 2. Navegación en la App (Bottom Tabs)
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Si ya está activo, no hacer nada
            if (item.classList.contains('active')) return;

            // Quitar active de todos los items y tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => {
                tab.classList.remove('active');
            });

            // Activar el clickado
            item.classList.add('active');

            // Mostrar contenido correspondiente
            const targetId = item.getAttribute('data-target');
            const targetTab = document.getElementById(targetId);
            const newTitle = item.getAttribute('data-title');

            // Actualizar el título del header
            headerTitle.textContent = newTitle;

            targetTab.style.display = 'block';
            void targetTab.offsetWidth;
            targetTab.classList.add('active');
        });
    });

    // 3. Logout (Vuelve al Login)
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            appScreen.classList.remove('active');
            appScreen.classList.add('hidden');

            loginScreen.classList.remove('hidden');
            setTimeout(() => loginScreen.classList.add('active'), 50);

            // Reset tabs al Inicio por defecto para la próxima vez
            document.querySelector('.nav-item[data-target="tab-inicio"]').click();
        });
    }

    // 4. Tabs internos de Mi Armario e Inspiración (Simulación de UI)
    const categoryTabs = document.querySelectorAll('.cat-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Encuentra el padre para solo cambiar los tabs de esa sección
            const parent = tab.parentElement;
            parent.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
});
