document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const toast = document.getElementById('toast');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Clear the form
                form.reset();
                
                // Show custom toast
                toast.classList.add('active');
                
                // Remove toast after 5 seconds
                setTimeout(() => {
                    toast.classList.remove('active');
                }, 5000);
            } else {
                showErrorToast('Ett fel uppstod. Försök igen senare.');
            }
        } catch (error) {
            showErrorToast('Ett fel uppstod. Försök igen senare.');
        }
    });

    function showErrorToast(message) {
        const icon = toast.querySelector('.fa-check-circle');
        const text = toast.querySelector('.text');
        const text2 = toast.querySelector('.text-2');
        
        icon.classList.remove('fa-check-circle');
        icon.classList.add('fa-exclamation-circle');
        icon.style.color = '#E42D40';
        
        text.textContent = 'Ett fel uppstod';
        text2.textContent = message;
        
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
            // Reset toast to success state
            setTimeout(() => {
                icon.classList.remove('fa-exclamation-circle');
                icon.classList.add('fa-check-circle');
                icon.style.color = '';
                text.textContent = 'Tack för ditt meddelande!';
                text2.textContent = 'Vi återkommer så snart som möjligt.';
            }, 500);
        }, 5000);
    }
}); 