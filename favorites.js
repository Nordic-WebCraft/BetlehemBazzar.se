// Update favorites grid
function updateFavoritesGrid() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const emptyWishlist = document.getElementById('emptyWishlist');
    
    if (!favoritesGrid) return;

    // Get favorite products
    const favoriteProducts = products.filter(product => wishlist.includes(product.id));
    
    // Show/hide empty wishlist message
    if (favoriteProducts.length === 0) {
        emptyWishlist.style.display = 'block';
        favoritesGrid.style.display = 'none';
    } else {
        emptyWishlist.style.display = 'none';
        favoritesGrid.style.display = 'grid';
        
        // Clear and populate grid
        favoritesGrid.innerHTML = '';
        favoriteProducts.forEach(product => {
            favoritesGrid.appendChild(createProductCard(product));
        });
    }
}

// Function to create product list for email
function createProductsList() {
    const favoriteProducts = products.filter(product => wishlist.includes(product.id));
    return favoriteProducts.map(product => 
        `${product.name} - ${product.price}`
    ).join('\n');
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Update hidden input with current favorites
    document.getElementById('favoriteProductsList').value = createProductsList();
    
    // Get form data
    const formData = new FormData(event.target);
    
    // Submit form
    fetch(event.target.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Show success message
        document.getElementById('toast').classList.add('active');
        setTimeout(() => {
            document.getElementById('toast').classList.remove('active');
        }, 5000);
        
        // Reset form
        event.target.reset();
    })
    .catch(error => console.log('Error:', error));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateFavoritesGrid();
    
    // Add form submit handler
    const form = document.getElementById('favoritesForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}); 