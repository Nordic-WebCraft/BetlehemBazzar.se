// Initialize wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Update wishlist count
function updateWishlistCount() {
    document.querySelector('.wishlist-count').textContent = wishlist.length;
}

// Toggle wishlist item
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateFeaturedProducts();
    // Update favorites if on favorites page
    if (typeof updateFavoritesGrid === 'function') {
        updateFavoritesGrid();
    }
    // Update products if on products page
    if (typeof updateProductCards === 'function') {
        updateProductCards();
    }
}

// Create product cards
function createProductCard(product) {
    const isLoved = wishlist.includes(product.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <button class="love-button ${isLoved ? 'active' : ''}" 
                    onclick="toggleWishlist(${product.id})">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    return card;
}

// Update featured products
function updateFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProductGrid');
    if (featuredGrid) {
        featuredGrid.innerHTML = '';
        const featuredProducts = products.filter(product => product.featured);
        featuredProducts.forEach(product => {
            featuredGrid.appendChild(createProductCard(product));
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    updateFeaturedProducts();
}); 