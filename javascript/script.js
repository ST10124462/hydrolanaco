
document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // 1. SETTING UP THE INTERACTIVE MAP
    // ==========================================================================
    const mapBox = document.getElementById("interactiveMap");
    
    if (mapBox) {
        
        const latitude = -26.1800;
        const longitude = 28.1800;
        const mapZoom = 13;

        // Create the moving map inside our HTML map box
        const myMap = L.map('interactiveMap').setView([latitude, longitude], mapZoom);

        // Load the actual map image tiles from the open-source library
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(myMap);

        // Put a clickable locator pin marker down on the map center point
        const mapPin = L.marker([latitude, longitude]).addTo(myMap);

        // Add a text box popup bubble that opens when someone clicks the map pin
        mapPin.bindPopup(`
            <div style="font-family: Arial, sans-serif; line-height: 1.4; color: #333;">
                <strong style="color: #00aaff; font-size: 14px;">Hydrolana Co.</strong><br>
                Johannesburg East Supply & Logistics Hub<br>
                <small style="color: #666;">Open: 8:00 AM - 17:00 PM</small>
            </div>
        `).openPopup();
    }

    // ==========================================================================
    // 2. CHECKING THE CONTACT FORM (VALIDATION)
    // ==========================================================================
    const entryForm = document.getElementById("contactForm");
    const statusMessageBox = document.getElementById("contactFeedback");

    if (entryForm) {
        entryForm.addEventListener("submit", function (event) {
           
            event.preventDefault();

           
            clearOldErrors();

            let formHasNoErrors = true;

          
            const nameBox = document.getElementById("contactName");
            if (nameBox.value.trim() === "") {
                showRedErrorText(nameBox, "Full Name cannot be left completely blank.");
                formHasNoErrors = false;
            } else if (nameBox.value.trim().length < 3) {
                showRedErrorText(nameBox, "The name must be at least 3 letters long.");
                formHasNoErrors = false;
            }

           
            const emailBox = document.getElementById("contactEmail");
            const generalEmailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailBox.value.trim() === "") {
                showRedErrorText(emailBox, "An email address is required.");
                formHasNoErrors = false;
            } else if (!generalEmailRules.test(emailBox.value.trim())) {
                showRedErrorText(emailBox, "Please fix your email layout (use something like name@company.com).");
                formHasNoErrors = false;
            }

            // 3. SHOWING RESPONSE MESSAGES WITHOUT RELOADING THE PAGE
            if (formHasNoErrors) {
                // Show a clean loading text notification to the visitor on screen
                statusMessageBox.className = "form-feedback";
                statusMessageBox.innerText = "Sending your inquiry securely. Please hold on...";
                statusMessageBox.classList.remove("hidden");

                
                setTimeout(function () {
                    statusMessageBox.className = "form-feedback success";
                    statusMessageBox.innerHTML = `<strong>Success!</strong> Thank you, your supply inquiry has been sent. A confirmation copy was sent to ${emailBox.value.trim()}.`;
                    
                  
                    entryForm.reset();
                }, 1800);
            } else {
               
                statusMessageBox.className = "form-feedback error";
                statusMessageBox.innerText = "Submission blocked. Please fix the highlighted errors above.";
                statusMessageBox.classList.remove("hidden");
            }
        });
    }

    
    function showRedErrorText(inputField, specificAlertText) {
        const errorLabel = document.createElement("span");
        errorLabel.className = "error-message";
        errorLabel.innerText = specificAlertText;
        errorLabel.style.display = "block";
        errorLabel.style.color = "#ff3333";
        errorLabel.style.fontSize = "12px";
        errorLabel.style.marginTop = "5px";
        errorLabel.style.fontWeight = "bold";
        
        inputField.parentNode.appendChild(errorLabel);
        inputField.style.borderColor = "#ff3333"; // Changes the box outline color to red
    }

    
    function clearOldErrors() {
        const matchingErrors = document.querySelectorAll(".error-message");
        matchingErrors.forEach(label => label.remove());

        if (entryForm) {
            const allInputBoxes = entryForm.querySelectorAll("input, textarea, select");
            allInputBoxes.forEach(input => input.style.borderColor = "#444444"); // Reset color lines to default
        }

        if (statusMessageBox) {
            statusMessageBox.className = "form-feedback hidden";
            statusMessageBox.innerText = "";
        }
    }
});
    // ==========================================================================
    // 3. DYNAMIC PRODUCT SEARCH BAR (FOR SERVICES PAGE)
    // ==========================================================================
    const productSearchBar = document.getElementById("serviceSearch");
    
    if (productSearchBar) {
        productSearchBar.addEventListener("keyup", function () {
           
            const userTypedText = productSearchBar.value.toLowerCase().trim();
            
            
            const productCards = document.querySelectorAll(".product-item");
            
            productCards.forEach(function (card) {
              
                const cardContentText = card.innerText.toLowerCase();
                
               
                if (cardContentText.includes(userTypedText)) {
                    card.style.display = ""; // Shows it normally
                } else {
                    card.style.display = "none"; // Hides it from screen completely
                }
            });
        });
    }

    // ==========================================================================
    // 4. FOR GALLERY PAGE
    // ==========================================================================
    
    const lightboxModal = document.createElement("div");
    lightboxModal.id = "lightboxModal";
    lightboxModal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:none; justify-content:center; align-items:center; z-index:9999; cursor:pointer;";
    
    
    const lightboxImage = document.createElement("img");
    lightboxImage.style.cssText = "max-width:85%; max-height:85%; border:3px solid #ffffff; border-radius:4px; box-shadow:0 5px 25px rgba(0,0,0,0.5);";
    lightboxModal.appendChild(lightboxImage);
    document.body.appendChild(lightboxModal);

   
    const galleryPictures = document.querySelectorAll(".gallery-container img, #gallery img");
    
    galleryPictures.forEach(function (picture) {
        picture.style.cursor = "pointer";
        picture.addEventListener("click", function () {
           
            lightboxImage.src = picture.src;
            lightboxModal.style.display = "flex"; 
        });
    });

    
    lightboxModal.addEventListener("click", function () {
        lightboxModal.style.display = "none";
    });
