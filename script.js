document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Loan Calculator Logic
    const loanAmountInput = document.getElementById('loanAmount');
    // Removed interestRateInput as it's now a fixed constant
    const loanTermInput = document.getElementById('loanTerm');
    const calculateBtn = document.getElementById('calculateBtn');
    const monthlyPaymentSpan = document.getElementById('monthlyPayment');
    const totalPaymentSpan = document.getElementById('totalPayment');
    const totalInterestSpan = document.getElementById('totalInterest');

    // Permanent Interest Rate (3%) - Can only be edited by the programmer
    const PERMANENT_ANNUAL_INTEREST_RATE = 3; 

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateLoan);
    }

    function calculateLoan() {
        const loanAmount = parseFloat(loanAmountInput.value);
        // Use the permanent interest rate
        const annualInterestRate = PERMANENT_ANNUAL_INTEREST_RATE; 
        const loanTermMonths = parseInt(loanTermInput.value);

        if (isNaN(loanAmount) || isNaN(loanTermMonths) || loanAmount <= 0 || loanTermMonths <= 0) {
            alert('Please enter valid positive numbers for Loan Amount and Loan Term.');
            monthlyPaymentSpan.textContent = '₦0.00';
            totalPaymentSpan.textContent = '₦0.00';
            totalInterestSpan.textContent = '₦0.00';
            return;
        }

        const monthlyInterestRate = (annualInterestRate / 100) / 12;

        let monthlyPayment;
        let totalPayment;
        let totalInterest;

        if (monthlyInterestRate === 0) {
            // Simple calculation for 0% interest
            monthlyPayment = loanAmount / loanTermMonths;
            totalPayment = loanAmount;
            totalInterest = 0;
        } else {
            // Standard EMI calculation
            monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
            totalPayment = monthlyPayment * loanTermMonths;
            totalInterest = totalPayment - loanAmount;
        }

        monthlyPaymentSpan.textContent = `₦${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalPaymentSpan.textContent = `₦${totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        totalInterestSpan.textContent = `₦${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // EmailJS Integration (for application form)
    // This part assumes you have an application form on 'application-form.html'
    // For demonstration, we'll simulate the submission here.
    // In a real scenario, you'd integrate this with your actual form submission logic.

    // Initialize EmailJS with your Public Key
    // emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual Public Key

    // Example function to send email after a *simulated* application submission
    // You would call this function when your application form on application-form.html is successfully submitted.
    function sendApplicationConfirmationEmail(applicantName, applicantEmail) {
        // Dummy values for demonstration. In a real app, these would come from form fields.
        const serviceID = 'service_0e6nifv'; // Replace with your actual service ID
        const templateID = 'template_7hrp5b4'; // Replace with your actual template ID

        const templateParams = {
            from_name: 'Unified SME Grants & Loans',
            to_name: applicantName,
            message: `Dear ${applicantName}, your application has been received successfully! We will review it and get back to you shortly.`,
            applicant_email: applicantEmail // Email of the applicant
        };

        /*
        // Uncomment and replace with your actual EmailJS setup
        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                console.log('Email successfully sent!', response.status, response.text);
                alert('Your application has been submitted, and a confirmation email has been sent!');
            }, function(error) {
                console.error('Email sending failed:', error);
                alert('Your application was submitted, but there was an issue sending the confirmation email. Please check your inbox later.');
            });
        */

        console.log("EmailJS send function commented out. Simulate successful email send for:", templateParams);
        alert('Your application has been submitted! (EmailJS simulated)');
    }

    // --- IMPORTANT: How to integrate EmailJS with your application form ---
    // On your 'application-form.html' page, you would have a form.
    // When that form is submitted (e.g., via an event listener on the form's submit button),
    // you would gather the applicant's name and email from the form fields.
    // Then, you would call `sendApplicationConfirmationEmail(name, email);`.

    // Example of how you might trigger it (this is illustrative, not active on index.html)
    // if (window.location.pathname.includes('application-form.html')) {
    //     const applicationForm = document.getElementById('yourApplicationFormId');
    //     if (applicationForm) {
    //         applicationForm.addEventListener('submit', (e) => {
    //             e.preventDefault();
    //             const applicantName = document.getElementById('applicantName').value; // Get from form
    //             const applicantEmail = document.getElementById('applicantEmail').value; // Get from form
    //             sendApplicationConfirmationEmail(applicantName, applicantEmail);
    //             // You might also submit the form data to your backend here
    //         });
    //     }
    // }
});