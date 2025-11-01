// Scroll suave manual e compatível com Chrome Desktop
const linksMenu = document.querySelectorAll('.nav-bar a[href^="#"]');

linksMenu.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const id = this.getAttribute('href');
        if (id === '#') return; // ignora o botão de tema

        const destino = document.querySelector(id);
        if (!destino) return;

        const headerHeight = document.querySelector('header').offsetHeight;

        // calcula posição real do destino
        const posicao = destino.offsetTop - headerHeight - 5;

        // rolagem suave *manual* — sem depender do comportamento nativo
        smoothScrollTo(0, posicao, 800); // 800ms = 0.8s de duração
    });
});

// Função que cria uma rolagem suave "na mão"
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // movimento com easing (suavização)
    const easeInOutQuart = (time, from, distance, duration) => {
        time /= duration / 2;
        if (time < 1) return (distance / 2) * time * time * time * time + from;
        time -= 2;
        return (-distance / 2) * (time * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) clearInterval(timer);
        window.scrollTo(newX, newY);
    }, 1000 / 60); // 60fps
}

