document.addEventListener('DOMContentLoaded', () => {

    const loginScreen = document.getElementById('login-screen');
    const appScreen = document.getElementById('app-screen');
    const btnEnter = document.getElementById('btn-enter');
    const btnLogout = document.getElementById('btn-logout');

    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const headerTitle = document.getElementById('header-title');

    const categoryTabs = document.querySelectorAll('.cat-tab');
    const clothItems = document.querySelectorAll('.cloth-item');

    if (btnEnter && loginScreen && appScreen) {
        btnEnter.addEventListener('click', () => {
            loginScreen.classList.remove('active');
            loginScreen.classList.add('hidden');
            appScreen.classList.remove('hidden');
            setTimeout(() => { appScreen.classList.add('active'); }, 50);
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.classList.contains('active')) return;

            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                tab.classList.add('hidden');
            });

            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            const targetTitle = item.getAttribute('data-title');

            if (headerTitle && targetTitle) {
                headerTitle.textContent = targetTitle;
            }

            if (targetPane) {
                targetPane.classList.remove('hidden');
                targetPane.classList.add('active');
            }
        });
    });

    if (btnLogout && loginScreen && appScreen) {
        btnLogout.addEventListener('click', () => {
            appScreen.classList.remove('active');
            appScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
            setTimeout(() => { loginScreen.classList.add('active'); }, 50);

            const firstTab = document.querySelector('.nav-item[data-target="tab-inicio"]');
            if (firstTab) firstTab.click();
        });
    }

    // --- LÓGICA DE FILTRADO ALEATORIO SIMULADO ---
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const container = tab.parentElement;
            if (!container) return;

            container.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterType = tab.getAttribute('data-filter');

            clothItems.forEach(item => {
                if (filterType === 'all') {
                    item.style.display = 'flex';
                } else if (filterType === 'filter-action') {
                    // Oculta prendas de forma aleatoria para simular la reactividad del filtro
                    item.style.display = Math.random() > 0.45 ? 'flex' : 'none';
                }
            });
        });
    });
});