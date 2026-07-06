/* ==========================================================================
   Recommendation Handling & Popup Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Select the recommendation form (adjust the ID/class to match your HTML)
    const recommendationForm = document.getElementById('recommendation-form');

    if (recommendationForm) {
        recommendationForm.addEventListener('submit', function(event) {
            // 1. Prevent the default browser form submission (page reload)
            event.preventDefault();

            // 2. Optional: Gather form data if you need to process it
            const formData = new FormData(this);
            const recommenderName = formData.get('recommenderName');
            const recommendationText = formData.get('recommendationText');

            // 3. Perform your submission logic (e.g., adding to a list or sending to a server)
            console.log('Submitting recommendation from:', recommenderName);

            // 4. Invoke the popup function ONLY after successful submission
            showPopup(recommenderName);

            // 5. Optional: Clear the form fields after submission
            this.reset();
        });
    }
});

/**
 * Displays a confirmation popup to the user.
 * @param {string} name - The name of the person who left the recommendation.
 */
function showPopup(name) {
    // Select your popup element (adjust selectors based on your HTML/CSS structure)
    const popup = document.getElementById('success-popup');
    const popupMessage = document.getElementById('popup-message');

    if (popup) {
        // Customize the message dynamically if a name is provided
        if (popupMessage && name) {
            popupMessage.textContent = `Thank you, ${name}! Your recommendation has been submitted successfully.`;
        }

        // Reveal the popup (usually handled via a CSS class like 'show' or 'active')
        popup.classList.add('active');
        
        // Alternative simple fallback if you aren't using a custom HTML modal yet:
        // alert(`Thank you, ${name}! Your recommendation has been submitted.`);
    }
}

/**
 * Closes the confirmation popup.
 */
function closePopup() {
    const popup = document.getElementById('success-popup');
    if (popup) {
        popup.classList.remove('active');
    }
}
