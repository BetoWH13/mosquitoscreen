const POSTS_PER_PAGE = 3;

function initializePagination() {
    const articles = document.querySelectorAll('.blog-excerpt');
    const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);
    
    // Create page containers
    for (let i = 0; i < articles.length; i++) {
        const pageNumber = Math.floor(i / POSTS_PER_PAGE) + 1;
        let pageDiv = document.getElementById('page' + pageNumber);
        
        if (!pageDiv) {
            pageDiv = document.createElement('div');
            pageDiv.id = 'page' + pageNumber;
            document.querySelector('.blog-content').appendChild(pageDiv);
        }
        
        pageDiv.appendChild(articles[i]);
    }
    
    // Create pagination controls
    const paginationNav = document.querySelector('.pagination');
    paginationNav.innerHTML = ''; // Clear existing pagination
    
    // Add previous button
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.textContent = '← Previous';
    prevButton.classList.add('prev');
    prevButton.onclick = function(e) {
        e.preventDefault();
        showPrevPage();
        return false;
    };
    paginationNav.appendChild(prevButton);
    
    // Add page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.onclick = function(e) {
            e.preventDefault();
            showPage(i);
            return false;
        };
        paginationNav.appendChild(pageLink);
    }
    
    // Add next button
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.textContent = 'Next →';
    nextButton.classList.add('next');
    nextButton.onclick = function(e) {
        e.preventDefault();
        showNextPage();
        return false;
    };
    paginationNav.appendChild(nextButton);

    // Show the first page
    showPage(1);
}

function showPage(pageNumber) {
    // Get total number of pages
    const pageLinks = document.querySelectorAll('.pagination a:not(.prev):not(.next)');
    const totalPages = pageLinks.length;
    
    // Hide all pages
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        if (page) page.style.display = 'none';
    }
    
    // Show the selected page
    const selectedPage = document.getElementById('page' + pageNumber);
    if (selectedPage) selectedPage.style.display = 'block';
    
    // Update pagination active state
    document.querySelectorAll('.pagination a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find the page link and set it as active
    pageLinks.forEach(link => {
        if (parseInt(link.textContent) === pageNumber) {
            link.classList.add('active');
        }
    });
    
    // Update prev/next buttons state
    const prevButton = document.querySelector('.pagination a.prev');
    const nextButton = document.querySelector('.pagination a.next');
    
    if (pageNumber === 1) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }
    
    if (pageNumber === totalPages) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
    
    // Store current page in a data attribute for prev/next functionality
    document.querySelector('.pagination').setAttribute('data-current-page', pageNumber);
    
    // Scroll to top of the blog section
    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
}

function showPrevPage() {
    const pagination = document.querySelector('.pagination');
    const currentPage = parseInt(pagination.getAttribute('data-current-page') || 1);
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
    return false;
}

function showNextPage() {
    const pagination = document.querySelector('.pagination');
    const currentPage = parseInt(pagination.getAttribute('data-current-page') || 1);
    const totalPages = document.querySelectorAll('.pagination a:not(.prev):not(.next)').length;
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
    return false;
}

// Initialize pagination when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePagination();
    // Set initial page data attribute
    document.querySelector('.pagination').setAttribute('data-current-page', 1);
    // Initialize prev button as disabled on first load
    document.querySelector('.pagination a.prev').classList.add('disabled');
});
