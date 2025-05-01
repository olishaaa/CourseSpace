let currentPage = 1;
const coursesPerPage = 10;
let coursesData = [];
let filteredCourses = [];

// Load data from JSON
fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    coursesData = data;
    filteredCourses = data; // Initially all courses
    loadCourses();
    
    // Read category from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      // If a category is passed, filter by it
      filterByCategory(categoryParam);
    }
  })
  .catch(error => console.error('Error loading courses:', error));

// Load courses
function loadCourses() {
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = currentPage * coursesPerPage;
  const coursesToDisplay = filteredCourses.slice(startIndex, endIndex);

  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; 

  coursesToDisplay.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.innerHTML = `
      <img src="${course.image}" alt="${course.title}">
      <div class="course-info">
        <h3>${course.title}</h3>
        <h4>${course.category}</h4>
        <p>${course.description}</p>
        <a href="${course.link}" class="btn">Go to course</a>
      </div>
    `;
    gallery.appendChild(courseCard);
  });

  updatePagination();
}

// Pagination
function updatePagination() {
  document.getElementById('prev').disabled = currentPage === 1;
  document.getElementById('next').disabled = currentPage * coursesPerPage >= filteredCourses.length;
}

// "Prev" button handler
document.getElementById('prev').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadCourses();
  }
});

// "Next" button handler
document.getElementById('next').addEventListener('click', () => {
  if (currentPage * coursesPerPage < filteredCourses.length) {
    currentPage++;
    loadCourses();
  }
});

// "Show More" button handler
document.getElementById('show-more').addEventListener('click', () => {
  currentPage++;
  loadCourses();
});

// Sorting
document.getElementById('sort').addEventListener('change', (e) => {
  const sortBy = e.target.value;
  filteredCourses.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });
  currentPage = 1; 
  loadCourses();
});

// Search
document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(query) ||
    course.description.toLowerCase().includes(query)
  );
  currentPage = 1; // Reset page to first
  loadCourses();
});

// Filter by category
function filterByCategory(category) {
  if (category === 'All') {
    filteredCourses = coursesData; 
  } else {
    filteredCourses = coursesData.filter(course => course.category === category);
  }
  currentPage = 1; 
  loadCourses();
}

