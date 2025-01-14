let currentCategory = 'all';

// Filter products by category
function filterProducts(category) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.category-button');
    buttons.forEach(button => {
        button.classList.toggle('active', button.dataset.category === category);
    });
    updateProductCards();
}

// Update product cards
function updateProductCards() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);
    
    filteredProducts.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateProductCards();

    // Add event listeners to category buttons
    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.category);
        });
    });
}); 