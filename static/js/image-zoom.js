// Image zoom functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'image-zoom-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        cursor: pointer;
        transition: opacity 0.3s ease;
    `;
    
    // Create close button
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10001;
        user-select: none;
        transition: color 0.3s ease;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = '#ccc';
    closeBtn.onmouseout = () => closeBtn.style.color = 'white';
    
    // Create image container
    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    // Create zoomed image
    const zoomedImg = document.createElement('img');
    zoomedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        transition: transform 0.3s ease;
    `;
    
    imgContainer.appendChild(zoomedImg);
    modal.appendChild(closeBtn);
    modal.appendChild(imgContainer);
    document.body.appendChild(modal);
    
    // Function to show modal
    function showModal(imgSrc, imgAlt) {
        zoomedImg.src = imgSrc;
        zoomedImg.alt = imgAlt || '';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
    
    // Function to hide modal
    function hideModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Close modal when clicking outside image or close button
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === imgContainer) {
            hideModal();
        }
    });
    
    closeBtn.addEventListener('click', hideModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });
    
    // Add click handlers to all images in content
    function addImageZoom() {
        const contentImages = document.querySelectorAll('.hextra-content img, article img, .content img, main img');
        
        contentImages.forEach(img => {
            // Skip if already has zoom functionality
            if (img.classList.contains('zoom-enabled')) return;
            
            // Add zoom class and cursor style
            img.classList.add('zoom-enabled');
            img.style.cursor = 'zoom-in';
            img.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            
            // Add hover effect
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
            
            // Add click handler for zoom
            img.addEventListener('click', function(e) {
                e.preventDefault();
                showModal(this.src, this.alt);
            });
        });
    }
    
    // Initialize zoom for existing images
    addImageZoom();
    
    // Re-initialize for dynamically loaded content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                addImageZoom();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});