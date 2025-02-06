function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.blog-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show the selected page
    document.getElementById('page' + pageNumber).style.display = 'block';
    
    // Update pagination active state
    document.querySelectorAll('.pagination a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.pagination a:nth-child(' + pageNumber + ')').classList.add('active');
    
    // Scroll to top of the blog section
    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
}
