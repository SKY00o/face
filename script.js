document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    let cartItems = parseInt(localStorage.getItem('cartCount')) || 0;
    
    // Initialize cart count from localStorage
    cartCount.textContent = cartItems;
    
    // Skeleton loading for images
    document.querySelectorAll('.product-image').forEach(img => {
        const skeleton = img.previousElementSibling;
        
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            if (skeleton && skeleton.classList.contains('skeleton')) {
                skeleton.classList.add('hidden');
            }
        });
        
        // If image is already cached
        if (img.complete) {
            img.classList.remove('loading');
            if (skeleton && skeleton.classList.contains('skeleton')) {
                skeleton.classList.add('hidden');
            }
        }
    });
    
    // Quick view popup
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const title = card.querySelector('.product-title').textContent;
            const price = card.querySelector('.product-price').textContent;
            const imgSrc = card.querySelector('.product-image').src.replace('w=300&h=300', 'w=600&h=600');
            
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalPrice').textContent = price;
            document.getElementById('modalImage').src = imgSrc;
            
            modal.classList.add('active');
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Fly to cart animation
    function flyToCart(imgElement, buttonElement) {
        const imgRect = imgElement.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        
        const flyingImg = document.createElement('img');
        flyingImg.src = imgElement.src;
        flyingImg.className = 'flying-product';
        flyingImg.style.left = imgRect.left + 'px';
        flyingImg.style.top = imgRect.top + 'px';
        
        document.body.appendChild(flyingImg);
        
        setTimeout(() => {
            flyingImg.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            flyingImg.style.left = cartRect.left + 'px';
            flyingImg.style.top = cartRect.top + 'px';
            flyingImg.style.animation = 'flyToCart 0.8s ease-in-out';
        }, 50);
        
        setTimeout(() => {
            document.body.removeChild(flyingImg);
            updateCartCount();
        }, 850);
    }
    
    // Update cart count with animation
    function updateCartCount() {
        cartItems++;
        cartCount.textContent = cartItems;
        cartCount.style.animation = 'none';
        
        setTimeout(() => {
            cartCount.style.animation = 'bounce 0.5s ease';
        }, 10);
        
        cartIcon.classList.add('shake');
        
        setTimeout(() => {
            cartIcon.classList.remove('shake');
        }, 500);
        
        // Save to localStorage
        localStorage.setItem('cartCount', cartItems);
    }
    
    // Cart icon click handler
    cartIcon.addEventListener('click', () => {
        alert(`You have ${cartItems} item(s) in your cart`);
    });
    
    // Wishlist heart animation
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                // Create floating hearts
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createFloatingHeart(this);
                    }, i * 100);
                }
            }
        });
    });
    
    // Create floating heart animation
    function createFloatingHeart(button) {
        const heart = document.createElement('div');
        heart.textContent = '❤';
        heart.style.position = 'fixed';
        heart.style.fontSize = '20px';
        heart.style.color = '#e74c3c';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(heart);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
        const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance - 50;
        
        heart.style.transition = 'all 1s ease-out';
        heart.style.opacity = '1';
        
        setTimeout(() => {
            heart.style.left = endX + 'px';
            heart.style.top = endY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(1.5)';
        }, 50);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 1050);
    }
    
    // Size selection with animation for all watches
    document.querySelectorAll('.product-card, .modal-content').forEach(card => {
        const sizeButtons = card.querySelectorAll('.size-btn');
        
        sizeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this card
                sizeButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Add clicked class for ripple effect
                this.classList.add('clicked');
                
                // Remove clicked class after animation
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 600);
            });
        });
    });
    
    // Add to cart button effect for all watches
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.product-card') || this.closest('.modal-content');
            const title = card.querySelector('.product-title, #modalTitle').textContent;
            const selectedSize = card.querySelector('.size-btn.active').dataset.size;
            const beltColor = card.closest('.product-card')?.dataset.beltColor || 'N/A';
            
            // Get image element
            let imgElement;
            if (card.classList.contains('modal-content')) {
                imgElement = document.getElementById('modalImage');
            } else {
                imgElement = card.querySelector('.product-image');
            }
            
            // Fly to cart animation
            flyToCart(imgElement, this);
            
            // Close modal if open
            modal.classList.remove('active');
            
            // Show success message after animation
            setTimeout(() => {
                alert(`Added ${title} (${selectedSize}, Belt: ${beltColor}) to cart!`);
            }, 900);
        });
    });
});
