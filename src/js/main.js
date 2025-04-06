document.addEventListener('DOMContentLoaded', () => {
  // === Burger menu ===
  const burger = document.querySelector('.burger-menu');
  const menu = document.querySelector('.main-menu');
 
  if (burger && menu) {
	  burger.addEventListener('click', () => {
		 menu.classList.toggle('active');
	  });
 
	  menu.querySelectorAll('a').forEach(link => {
		 link.addEventListener('click', () => {
        menu.classList.remove('active');
		 });
	  });
  }
 
  // === Slider ===
  const slidesContainer = document.querySelector('.slides');
 
  if (slidesContainer) {
	  const prev = document.getElementById('prevs');
	  const next = document.getElementById('nexts');
 
	  let slidesData = [];
	  let currentIndex = 0;
 
	  fetch('courses.json')
		 .then(res => res.json())
		 .then(data => {
        slidesData = data.slice(0, 20);
        createSlides(slidesData);
        showSlide(currentIndex);
		 });
 
	  function createSlides(data) {
		 slidesContainer.innerHTML = '';
 
		 data.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
 
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
 
        const textOverlay = document.createElement('div');
        textOverlay.classList.add('text-overlay');
 
        const title = document.createElement('h3');
        title.textContent = item.title;
 
        const description = document.createElement('p');
        description.textContent = item.description;
 
        textOverlay.appendChild(title);
        textOverlay.appendChild(description);
        slide.appendChild(img);
        slide.appendChild(textOverlay);
        slidesContainer.appendChild(slide);
		 });
	  }
 
	  function showSlide(index) {
		 const slides = document.querySelectorAll('.slide');
		 slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
		 });
	  }
 
	  if (prev && next) {
		 prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
        showSlide(currentIndex);
		 });
 
		 next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slidesData.length;
        showSlide(currentIndex);
		 });
	  }
  }
});
 
// === Map init (safe) ===
function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;
 
  const location = { lat: 40.748817, lng: -73.985428 };
 
  const map = new google.maps.Map(mapElement, {
	  zoom: 14,
	  center: location,
  });
 
  const marker = new google.maps.Marker({
	  position: location,
	  map: map,
	  title: 'Our Location',
  });
 
  const infowindow = new google.maps.InfoWindow({
	  content: '<b>Our Location</b><br>Empire State Building',
  });
 
  marker.addListener('click', function () {
	  infowindow.open(map, marker);
  });
}
 

window.onload = function () {
  if (typeof google !== 'undefined' && google.maps) {
	  initMap();
  }
};
 