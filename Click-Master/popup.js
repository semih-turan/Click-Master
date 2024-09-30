// Add event listener to the button with id 'clickButton'
document.getElementById('clickButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value; // Get the value from the input field
    const category = document.getElementById('category').value; // Get the selected category
  
    // Send content to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id }, // Target the active tab
        func: clickElement, // Call the clickElement function
        args: [userInput, category] // Pass the input and category as arguments
      });
    });
  });
  
  // Function to find and click an element based on the user's input and category
  function clickElement(input, category) {
    let element;
    if (category === 'selector') {
      // Find element using a CSS selector
      element = document.querySelector(input);
    } else if (category === 'xpath' || category === 'full_xpath') {
      // Find element using XPath
      element = document.evaluate(input, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
  
    // If the element is found, click it; otherwise, alert the user
    if (element) {
      element.click();
    } else {
      alert("Element not found!"); // Alert when the element is not found
    }
  }
  
  // Dark mode toggle button
  const darkModeButton = document.getElementById('darkModeButton');
  const modeIcon = document.getElementById('modeIcon');
  
  // Remember the dark mode state using local storage
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode(); // Enable dark mode if previously set
  } else {
    disableDarkMode(); // Disable dark mode if not set
  }
  
  // Toggle dark mode on button click
  darkModeButton.addEventListener('click', () => {
    if (localStorage.getItem('darkMode') !== 'enabled') {
      enableDarkMode(); // Enable dark mode
    } else {
      disableDarkMode(); // Disable dark mode
    }
  });
  
  // Function to enable dark mode
  function enableDarkMode() {
    document.body.classList.add('dark-mode'); // Add the dark mode class to the body
    modeIcon.src = 'icons/sun-icon.png'; // Change the icon to sun
    localStorage.setItem('darkMode', 'enabled'); // Save dark mode state in local storage
  }
  
  // Function to disable dark mode
  function disableDarkMode() {
    document.body.classList.remove('dark-mode'); // Remove the dark mode class from the body
    modeIcon.src = 'icons/moon-icon.png'; // Change the icon to moon
    localStorage.setItem('darkMode', 'disabled'); // Save light mode state in local storage
  }
