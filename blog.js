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
            pageDiv.style.display = 'none';
            document.querySelector('.blog-content').appendChild(pageDiv);
        }
        
        pageDiv.appendChild(articles[i]);
    }
    
    // Show first page
    document.getElementById('page1').style.display = 'block';
    
    // Create pagination controls
    const paginationNav = document.querySelector('.pagination');
    paginationNav.innerHTML = ''; // Clear existing pagination
    
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        if (i === 1) pageLink.classList.add('active');
        pageLink.onclick = function(e) {
            e.preventDefault();
            showPage(i);
            return false;
        };
        paginationNav.appendChild(pageLink);
    }
}

function showPage(pageNumber) {
    // Get total number of pages
    const totalPages = document.querySelectorAll('.pagination a').length;
    
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
    document.querySelector('.pagination a:nth-child(' + pageNumber + ')').classList.add('active');
    
    // Scroll to top of the blog section
    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
}

// Initialize pagination when the page loads
document.addEventListener('DOMContentLoaded', initializePagination);
