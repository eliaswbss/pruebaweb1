document.addEventListener('DOMContentLoaded', () => {
    
    // --- Referencias a DOM ---
    const splashScreen = document.getElementById('splash-screen');
    const landingScreen = document.getElementById('landing-screen');
    const appScreen = document.getElementById('app-screen');
    const installOverlay = document.getElementById('install-overlay');
    const progressBar = document.querySelector('.progress');
    
    const btnDownload = document.getElementById('btn-download');
    const btnDemo = document.getElementById('btn-demo');
    const btnLogout = document.getElementById('btn-logout');

    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- Lógica de Transiciones ---
    
    // 1. Splash Screen -> Landing Screen (Simula carga inicial)
    setTimeout(() => {
        splashScreen.classList.remove('active');
        splashScreen.classList.add('hidden');
        
        landingScreen.classList.remove('hidden');
        // Pequeño retraso para permitir que el display block se aplique antes de la opacidad
        setTimeout(() => landingScreen.classList.add('active'), 50);
    }, 2000); // 2 segundos de splash screen

    // 2. Landing -> Instalación -> App Screen
    const startInstall = () => {
        installOverlay.classList.remove('hidden');
        let width = 0;
        
        const interval = setInterval(() => {
            width += Math.random() * 15 + 5; // Incremento aleatorio
            if (width >= 100) width = 100;
            
            progressBar.style.width = width + '%';
            
            if (width === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    installOverlay.classList.add('hidden');
                    
                    landingScreen.classList.remove('active');
                    landingScreen.classList.add('hidden');
                    
                    appScreen.classList.remove('hidden');
                    setTimeout(() => appScreen.classList.add('active'), 50);
                }, 500);
            }
        }, 300);
    };

    btnDownload.addEventListener('click', startInstall);
    btnDemo.addEventListener('click', startInstall); // El botón de demo hace lo mismo

    // 3. Navegación en la App (Bottom Tabs)
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Si ya está activo, no hacer nada
            if(item.classList.contains('active')) return;

            // Quitar active de todos los items y tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                setTimeout(() => tab.style.display = 'none', 300); // Tiempo de fade out
            });

            // Activar el clickado
            item.classList.add('active');
            
            // Mostrar contenido correspondiente
            const targetId = item.getAttribute('data-target');
            const targetTab = document.getElementById(targetId);
            
            targetTab.style.display = 'block';
            // Reflow hack para asegurar que la animación se dispare
            void targetTab.offsetWidth;
            targetTab.classList.add('active');
        });
    });

    // 4. Logout (Vuelve a la landing)
    btnLogout.addEventListener('click', () => {
        appScreen.classList.remove('active');
        appScreen.classList.add('hidden');
        
        landingScreen.classList.remove('hidden');
        setTimeout(() => landingScreen.classList.add('active'), 50);
        
        // Reset tabs al Home por defecto para la próxima vez
        document.querySelector('.nav-item[data-target="tab-home"]').click();
        progressBar.style.width = '0%'; // Reset progress bar
    });
});
