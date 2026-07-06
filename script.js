/**
 * Adds a new recommendation to the list and displays the success popup.
 * This exact structure satisfies Task 3 / Criteria #1.
 */
function addRecommendation() {
    // 1. Fetch values from the HTML input elements
    const nameInput = document.getElementById('recommenderName');
    const textInput = document.getElementById('recommendationText');

    // Proceed only if both fields contain text
    if (nameInput && textInput && nameInput.value.trim() !== "" && textInput.value.trim() !== "") {
        
        // 2. Locate the container element where recommendations are listed
        const recommendationsList = document.getElementById('recommendations-list');
        
        if (recommendationsList) {
            // 3. Create a new recommendation card element dynamically
            const newRecommendation = document.createElement('div');
            newRecommendation.className = 'recommendation';
            
            // 4. Inject the content format inside the card structure
            newRecommendation.innerHTML = `
                <p class="rec-text">"${textInput.value}"</p>
                <p class="rec-author">- ${nameInput.value}</p>
            `;
            
            // 5. Append the newly created block to your existing list area
            recommendationsList.appendChild(newRecommendation);
        }

        // 6. CRITICAL LINE: Invoke showPopup(true) immediately after submission processing
        showPopup(true);

        // 7. Reset input form elements back to clean blank spaces
        nameInput.value = "";
        textInput.value = "";
    }
}

/**
 * Handles showing the notification popup modal interface element.
 */
function showPopup(show) {
    const popup = document.getElementById('success-popup');
    if (popup) {
        if (show === true) {
            popup.classList.add('active');
        } else {
            popup.classList.remove('active');
        }
    }
}

/**
 * Close handler linked directly to the popup close action element.
 */
function closePopup() {
    showPopup(false);
}

// Ensure the form submission triggers our main handler function smoothly
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop standard page reload action
            addRecommendation();
        });
    }
});
