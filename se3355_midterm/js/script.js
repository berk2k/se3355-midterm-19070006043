
const form = document.getElementById("Appointment-form");


//cities
document.addEventListener("DOMContentLoaded", function(){
  const citiesDropdown = document.getElementById("city");

  fetch('https://run.mocky.io/v3/259b7ec6-de12-4dcc-8295-10dce6820ce8')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const cities = data.cities;

    cities.forEach(function(city) {
      const option = document.createElement("option");
      option.value = city;
      option.text = city;
      citiesDropdown.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
});

//course types
document.addEventListener("DOMContentLoaded", function() {
  const coursesDropDown = document.getElementById("course-type");

  fetch('https://run.mocky.io/v3/ea63341e-dc7c-40d6-b842-408ed07bd950')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const courseTypes = data.courseTypes;

      courseTypes.forEach(function(course) {
        const option = document.createElement("option");
        option.value = course.name;
        option.text = course.name;
        coursesDropDown.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error.message);
    });
});

function validateAndSubmit() {
    
    
    resetErrors();

    var title = document.getElementById("title").value;
    if (title.trim() === "") {
        displayError("title", "Title cannot be empty");
    }

    var name = document.getElementById("name").value;
    if(name.trim() === ""){
        displayError("name", "Name cannot be empty");
    }

    var email = document.getElementById("email-input").value;
    if(email.trim() === ""){
        displayError("email-input", "Email cannot be empty");
    }
    else{
      if(!validateEmail(email)){
        displayError("email-input", "Invalid Email!");
      }
    }

    var phoneNumber = document.getElementById("phone-number").value;
    if(phoneNumber.trim() === ""){
        displayError("phone-number", "Phone Number cannot be empty");
        
    }
    else{
      if(!isTurkishPhoneNumber(phoneNumber)){
        displayError("phone-number", "Phone Number must be Turkish!");
      }
    }

    var courseType = document.getElementById("course-type").value;

    if (courseType === "") {
        displayError("course-type", "Please select a course type");
    }   
    
    var city = document.getElementById("city").value;

    if (city === "") {
        displayError("city", "Please select a city");
    }  
    
    var checkbox = document.getElementById("flexCheckDefault");
    if (!checkbox.checked) {
      displayError("flexCheckDefault", "You must agree to the Terms and Conditions.");
    }

    
    if (document.querySelectorAll(".error:not(:empty)").length === 0) {
        window.location.href = '../html/routed_page.html';
        alert('Form submitted successfully!'); 
        
    }
}

function resetErrors() {
    
    var errors = document.querySelectorAll(".error");
    errors.forEach(function (error) {
        error.textContent = "";
    });
}

function displayError(field, message) {
    
    var errorElement = document.getElementById(field + "-error");
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function isTurkishPhoneNumber(phoneNumber) {
  
  const turkishPhoneNumberRegex = /^(?:(\+?90[\s\-]?)|0?)[1-9]\d{9}$/;
  return turkishPhoneNumberRegex.test(phoneNumber);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}