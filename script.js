const hello = document.getElementById('hello');

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 70%, 50%)`;
}

hello.addEventListener('click', () => {
    hello.style.color = getRandomColor();
    hello.style.textShadow = `0 0 50px ${getRandomColor()}`;
});

document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 30;
    const y = (window.innerHeight / 2 - e.pageY) / 30;
    hello.style.transform = `translate(${x}px, ${y}px)`;
});