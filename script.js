// script.js

// Function to handle schedule tabs
function showSchedule(dayIndex) {
    // Hide all content
    const contents = document.querySelectorAll('.schedule-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.schedule-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content and make tab active
    tabs[dayIndex].classList.add('active');
    contents[dayIndex].classList.add('active');
}

// Modal functionality
function openRegistrationModal(eventName, eventType, venue) {
    document.getElementById('event-name').textContent = eventName;
    
    // Set different fees based on event type
    let fee = "₹299"; // Default fee
    if (eventType === 'technical') {
        fee = "₹299";
    } else if (eventType === 'workshop') {
        fee = "₹499";
    }
    
    document.getElementById('event-fee').textContent = fee;
    document.getElementById('registration-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('registration-modal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('registration-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Form submission
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather form data
    const formData = {
        fullName: document.getElementById('full-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        college: document.getElementById('college').value,
        department: document.getElementById('department').value,
        eventName: document.getElementById('event-name').textContent
    };

    // Send data to the backend
    fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeModal();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Automatically show the current day's schedule when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Default to day 3 (March 11) as shown in the HTML
    showSchedule(2);
});
