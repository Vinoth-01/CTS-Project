let currentContainer = null; // Variable to keep track of the currently visible container
let currentButton = null; // Variable to keep track of the currently active button

function showContainer(containerId, button) {
    const mainContent = document.getElementById("main-content");

    // Hide the current container if it exists
    if (currentContainer) {
        currentContainer.style.display = 'none';
        // Check and update color of the previous button
        const previousButton = document.querySelector(`#left-container div[onclick*="${currentContainer.id}"]`);
        if (previousButton) {
            checkFormCompletion(currentContainer.id, previousButton);
        }
    }

    // Remove 'active' class from the current button if it exists
    if (currentButton) {
        currentButton.classList.remove('active');
    }

    // Show the selected container and add 'active' class
    const container = document.getElementById(containerId);
    container.style.display = 'block';
    currentContainer = container; // Update the current container

    // Add 'active' class to the clicked button
    if (button) {
        button.classList.add('active');
        currentButton = button; // Update the current button
    }

    // Ensure main content is visible
    mainContent.style.display = "flex";

    // Check if all fields in the current container are filled
    const buttonOnLeft = document.querySelector(`#left-container div[onclick*="${containerId}"]`);
    if (buttonOnLeft) {
        checkFormCompletion(containerId, buttonOnLeft);
    }
}

function checkFormCompletion(containerId, button) {
    const form = document.getElementById(`form-container-${containerId}`);
    if (!form) return; // Exit if no form found

    // Check if all required fields are filled
    const allFilled = [...form.querySelectorAll('input[required]')].every(input => input.value.trim() !== '');

    // Toggle 'completed' class based on form completion
    if (allFilled) {
        button.classList.add('completed');
    } else {
        button.classList.remove('completed');
    }
}

function validateAndShowNext(containerId) {
    const form = document.getElementById(`form-container-${containerId}`);
    if (!form) return; // Exit if no form found

    const requiredInputs = form.querySelectorAll('input[required]');
    let allFilled = true;

    // Check each required input
    requiredInputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    // Show or hide error message
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        if (allFilled) {
            errorMessage.style.display = 'none'; // Hide error message if all fields are filled
            const nextButton = form.querySelector('button[type="button"]');
            if (nextButton) {
                nextButton.disabled = false;
            }
        } else {
            errorMessage.style.display = 'block'; // Show error message if any field is empty
            const nextButton = form.querySelector('button[type="button"]');
            if (nextButton) {
                nextButton.disabled = true;
            }
        }
    }

    return allFilled;
}

function moveToNextContainer(containerId, nextContainerId) {
    if (validateAndShowNext(containerId)) {
        showContainer(nextContainerId, currentButton);
    }
}

// Attach event listeners to form inputs to check completion on input
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('input', () => {
        const containerId = input.closest('.new-container').id;
        const button = document.querySelector(`#left-container div[onclick*="${containerId}"]`);
        if (button) {
            checkFormCompletion(containerId, button);
        }
    });
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Here you can add code to process the form data if needed

    // Display the success message
    document.getElementById('success-message').style.display = 'block';
}
document.getElementById('profile-image').addEventListener('click', function () {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('logout-link').addEventListener('click', function () {
    // Add your logout logic here
    alert('Logging out...');
});

