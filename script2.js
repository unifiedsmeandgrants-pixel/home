(function() {
    emailjs.init("-aGoGC8i_v9l-aeui"); // Replace with your actual EmailJS User ID
})();

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentMessage = document.getElementById('commentMessage');

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formName = document.getElementById('commentName').value;
        const formEmail = document.getElementById('commentEmail').value;
        const userComment = document.getElementById('userComment').value;

        // Basic validation
        if (!userComment) {
            commentMessage.textContent = 'Please enter your suggestion or comment.';
            commentMessage.style.backgroundColor = '#f44336';
            commentMessage.style.display = 'block';
            return;
        }

        const templateParams = {
            from_name: formName || 'Anonymous',
            from_email: formEmail || 'no-email-provided@example.com',
            message: userComment,
            to_email: formEmail, // Send a copy to the user if email is provided
            reply_to: formEmail // Set reply-to for your convenience
        };

        emailjs.send('service_0e6nifv', 'template_7hrp5b4', templateParams) // Replace with your Service ID and Template ID
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                commentMessage.textContent = 'Thank you for your suggestion/comment! A confirmation email has been sent if you provided your email.';
                commentMessage.style.backgroundColor = '#4CAF50';
                commentMessage.style.display = 'block';
                commentForm.reset();
            }, (error) => {
                console.log('FAILED...', error);
                commentMessage.textContent = 'Failed to send your suggestion/comment. Please try again later.';
                commentMessage.style.backgroundColor = '#f44336';
                commentMessage.style.display = 'block';
            });
    });

    // You can add more JavaScript here if you had other interactive elements,
    // like the beneficiary form submission, though it's currently linked to Zoho.
    // For example, if you wanted to handle the "Become a Beneficiary Now" button
    // differently or enable the #registration-form-section dynamically:

    // const beneficiaryButton = document.querySelector('#beneficiary-intro button a');
    // const registrationFormSection = document.getElementById('registration-form-section');

    // if (beneficiaryButton) {
    //     beneficiaryButton.addEventListener('click', (e) => {
    //         // If you wanted to show your own form instead of linking to Zoho
    //         // e.preventDefault();
    //         // registrationFormSection.style.display = 'block';
    //         // document.getElementById('beneficiary-intro').style.display = 'none';
    //     });
    // }

    // If the beneficiary form (id="beneficiaryForm") was to be submitted via AJAX
    // const beneficiaryForm = document.getElementById('beneficiaryForm');
    // const formMessage = document.getElementById('formMessage');

    // if (beneficiaryForm) {
    //     beneficiaryForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // Here you would handle the form submission, potentially sending
    //         // data to a backend or another EmailJS template for beneficiary registrations.
    //         // For this HTML, it's currently suggested to use the Zoho form link.
    //         formMessage.textContent = "This form is for demonstration. Please use the 'Become a Beneficiary Now' link.";
    //         formMessage.style.backgroundColor = '#2196F3';
    //         formMessage.style.display = 'block';
    //     });
    // }
    
});
