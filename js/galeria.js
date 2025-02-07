const slider = document.getElementById('slider');
const images = Array.from(document.querySelectorAll('.slider-img'));
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close');
const modalNext = document.getElementById('modal-next');
const modalPrev = document.getElementById('modal-prev');
const sliderNext = document.createElement('button');
const sliderPrev = document.createElement('button');

// Crear botones de navegación en el slider
sliderNext.innerHTML = '&#9654;'; // Flecha derecha
sliderPrev.innerHTML = '&#9664;'; // Flecha izquierda
sliderNext.id = 'slider-next';
sliderPrev.id = 'slider-prev';
slider.appendChild(sliderNext);
slider.appendChild(sliderPrev);

let currentIndex = 0;
const totalImages = images.length;
let imageWidth = images[0].offsetWidth + parseFloat(getComputedStyle(images[0]).marginLeft) * 2;

const updateSliderPosition = () => {
    slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
};

window.addEventListener('resize', () => {
    imageWidth = images[0].offsetWidth + parseFloat(getComputedStyle(images[0]).marginLeft) * 2;
    updateSliderPosition();
});

const changeImage = (direction) => {
    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    requestAnimationFrame(updateSliderPosition);
};

nextBtn.addEventListener('click', () => changeImage(1));
prevBtn.addEventListener('click', () => changeImage(-1));
sliderNext.addEventListener('click', () => changeImage(1));
sliderPrev.addEventListener('click', () => changeImage(-1));

images.forEach((image, index) => {
    image.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = image.src;
        currentIndex = index;
        document.body.style.overflow = 'hidden';
    });
});

const updateModalImage = () => {
    modalImg.src = images[currentIndex].src;
};

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') changeImage(1);
        else if (e.key === 'ArrowLeft') changeImage(-1);
        else if (e.key === 'Escape') closeModal();
        updateModalImage();
    }
});

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

modalNext.addEventListener('click', () => { changeImage(1); updateModalImage(); });
modalPrev.addEventListener('click', () => { changeImage(-1); updateModalImage(); });
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
closeBtn.addEventListener('click', closeModal);

updateSliderPosition();
