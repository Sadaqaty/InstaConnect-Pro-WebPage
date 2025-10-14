document.addEventListener('DOMContentLoaded', function() {
    // Create popup container
    const popupHTML = `
        <div class="calendly-popup-overlay" id="calendlyPopup">
            <button class="calendly-close" id="closeCalendly">&times;</button>
            <div class="calendly-popup-container">
                <div class="calendly-inline-widget" 
                     data-url="https://calendly.com/hi-sharafat/meeting" 
                     style="min-width:320px;height:100%;">
                </div>
            </div>
        </div>
    `;
    
    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Initialize Calendly script if not already loaded
    if (!document.querySelector('script[src*="calendly.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);
    }
    
    // Handle popup open/close
    const popup = document.getElementById('calendlyPopup');
    const closeBtn = document.getElementById('closeCalendly');
    
    // Open popup when clicking any book demo button
    document.querySelectorAll('[data-calendly-trigger]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            popup.classList.add('visible');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close popup
    function closePopup() {
        popup.classList.remove('visible');
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closePopup);
    
    // Close when clicking outside the popup content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('visible')) {
            closePopup();
        }
    });
});
