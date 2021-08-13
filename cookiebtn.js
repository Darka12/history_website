// References cookie banner and cookie button
const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => { // Listens for the cookie button being clicked
    cookieContainer.classList.remove("active"); // Removes the cookie banner after the cookie button has been clicked
    localStorage.setItem("cookieBannerDisplayed", "True") // Stores the user's choice (OK to cookies) in the applications local storage
});

setTimeout( () => {
    if(!localStorage.getItem("cookieBannerDisplayed")){ // If the user has clicked the OK button (checks local storage) then dont display the cookie banner again if the page reloads
    cookieContainer.classList.add("active"); // Displays cookie policy 2 seconds (2000ms) after the page loads
    }
}, 2000);