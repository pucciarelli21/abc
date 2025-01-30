const slider = document.getElementById('slider');
const images = document.querySelectorAll('.slider-img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close');

let currentIndex = 0;
const totalImages = images.length;

// Función para calcular el ancho total visible de una imagen, incluyendo márgenes
const getImageWidth = () => {
    const style = window.getComputedStyle(images[0]); // Estilo de la primera imagen
    const imageWidth = images[0].offsetWidth; // Ancho de la imagen
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight); // Margen total
    return imageWidth + margin; // Ancho completo
};

// Ajusta dinámicamente el desplazamiento del slider
const updateSliderPosition = () => {
    const imageWidth = getImageWidth(); // Ancho visible de cada imagen
    slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
};

// Redimensiona dinámicamente al cambiar el tamaño de la ventana
window.addEventListener('resize', updateSliderPosition);

// Botones de avanzar y retroceder con loop infinito
nextBtn.addEventListener('click', () => {
    const imageWidth = getImageWidth();
    currentIndex = (currentIndex + 1) % totalImages; // Regresa al inicio si llega al final
    updateSliderPosition();
});

prevBtn.addEventListener('click', () => {
    const imageWidth = getImageWidth();
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Salta al final si está en el inicio
    updateSliderPosition();
});

// Modal de imagen grande
images.forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = image.src;
        document.body.style.overflow = 'hidden'; // Deshabilita el scroll de la página
    });
});

// Cerrar modal si se hace clic fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Habilita el scroll de la página nuevamente
    }
});

// Cerrar modal con el botón de cerrar
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Habilita el scroll de la página nuevamente
});

// Inicializa la posición del slider al cargar la página
updateSliderPosition();