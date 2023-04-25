let form = document.getElementById("new-expense");
let user_budgets = document.getElementById("userbudgets");
if ((expense_counter = localStorage.getItem("expense_counter")) == undefined) {
    expense_counter = 0;
}
if ((maximum_expense_counter = localStorage.getItem("maximum_expense_counter")) == undefined) {
    maximum_expense_counter = 0;
}
if ((maximum_budget_counter = localStorage.getItem("maximum_budget_counter")) == undefined) {
    maximum_budget_counter = 0;
}

//JSON that stores the amount, budget and reset period of the expense created 
let expense_json = {
    "name": "",
    "amount": "",
    "budget_name": "",
    "reset_period": "",
    "reset_date": "",
    "last_reset": ""
}

/* Displays the text custom date number input if "Custom Date" is selected from drop-down */
var dropdown = document.getElementById("resetperiod");
var resetDate = document.getElementById("resetdate");
var custom_header = document.getElementById("resetCustomHeader")
dropdown.addEventListener("change", function() 
{
  // Check if the selected option is "Custom Date"
  if (dropdown.value === "custom-date") {
    custom_header.style.display = "inline-block"; // Display the header for the custom reset date
    resetDate.style.display = "inline-block";  // Display the number input for the custom reset date
  } else {
    custom_header.style.display = "none"; // Hide the number input for the custom reset date
    resetDate.style.display = "none"; // Hide the number input for the custom reset date
  }
});


/* Save the expense */
form.addEventListener("submit", function(e) {
    e.preventDefault();
    var expense_name = document.getElementById("expensenametext").value;
    var expense_amount = document.getElementById("expensequantity").value;
    var category = document.getElementById("userbudgets");
    var budget_name = category.options[category.selectedIndex].text;
    //check that the expense name doesn't already exist
    if (get_expense_json(expense_name, budget_name)) {
        alert("That expense name already exists. \nPlease choose a different name for your expense");
        return;
    }
    var reset_period = document.getElementById("resetperiod");
    var expense_reset_period = reset_period.options[reset_period.selectedIndex].text;
    var reset_date = document.getElementById("resetdate").value;
    expense_counter++;
    maximum_expense_counter++;
    localStorage.setItem("expense_counter", expense_counter);
    localStorage.setItem("maximum_expense_counter", maximum_expense_counter);
    expense_json.name = expense_name;
    expense_json.amount = expense_amount;
    expense_json.budget_name = budget_name;
    expense_json.reset_period = expense_reset_period;
    expense_json.reset_date = reset_date;
    expense_json.last_reset = new Date().toISOString().slice(0, 10);
    localStorage.setItem("expense"+maximum_expense_counter.toString(), JSON.stringify(expense_json));
    var [budget_json, budget_json_index] = get_budget_json(expense_json.budget_name);
    budget_json.amount_left = (parseFloat(budget_json.amount_left) - parseFloat(expense_json.amount)).toFixed(2);
    localStorage.setItem("budget"+budget_json_index.toString(), JSON.stringify(budget_json));
    alert("Your expense has been saved");
    form.reset();
    localStorage.setItem("selected_budget", budget_name);
    window.open("budget.html", "_self");
});

/* To show the names of the budgets created by the user in the drop-down menu */
for (var i = 0; i < maximum_budget_counter; i++) {
    var budget_text = localStorage.getItem("budget"+(i+1).toString());
    var budget_json = JSON.parse(budget_text);
    if (budget_json) {
        new_budget_option(budget_json.name);
    }
}

/* To create a new option in the drop-down menu */
function new_budget_option(budget_name) {
    // create the option element
    var option = document.createElement("option");
    // add the value attribute to the element
    option.value = budget_name;
    // create the structure by using appendChild
    user_budgets.appendChild(option);
    // give a value to the element
    option.innerHTML = budget_name;
} 

/* To prevent the user from saving the expense if the Save button is not pressed */
form.addEventListener("keydown", function(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
    }
});

function get_expense_json(expense_name, budget_name) {
    for (var i=0; i < maximum_expense_counter; i++) {
        var curr_expense_text = localStorage.getItem("expense"+(i+1).toString());
        var curr_expense_json = JSON.parse(curr_expense_text);
        if (curr_expense_json && expense_name == curr_expense_json.name && budget_name == curr_expense_json.budget_name) {
            //expense already exists
            return true;
        }
    }
}

function get_budget_json(budget_name) { //look for the budget with the specified name
    for (var i=0; i < maximum_budget_counter; i++) {
        var curr_budget_text = localStorage.getItem("budget"+(i+1).toString());
        var curr_budget_json = JSON.parse(curr_budget_text);
        if (curr_budget_json && budget_name == curr_budget_json.name) {
            return [curr_budget_json, i+1];
        }
    }
}

document.getElementById('inputImage').addEventListener('change', processImage);

// Function that processes the selected image using OCR and displays the parsed data
function processImage() {
    const image = document.getElementById('inputImage').files[0]; // Get the selected image file

    // Use Tesseract.js to perform OCR on the image
    Tesseract.recognize(
        image,
        'eng', // Set the language to English
        { logger: (m) => console.log(m) } // Log any errors or progress updates
    ).then(({ data: { text } }) => { // Once the OCR is complete, extract the text data and parse it
        const parsedData = parseReceiptData(text);
        document.getElementById("expensequantity").value = parsedData;
    })
    .catch(error => {
        console.error('Error processing image:', error); // Log any errors that occur during OCR
    });
}

// Add event listener to the "Scan Receipt" button that triggers image selection
document.getElementById('scanReceiptButton').addEventListener('click', function () {
    document.getElementById('inputImage').click(); // Clicks the hidden file input element to select an image
});

// Function that parses the text data extracted from the image and returns a formatted string
function parseReceiptData(text) {
    const lines = text.split('\n'); // Split the text data into an array of lines
    const itemLines = lines.filter(line => line.match(/\$\d+\.\d+/)); // Filter the lines to only include those that contain item data
    const formattedItems = [];
    const prices = [];

    // Loop through each item line and extract the item name, quantity, and total value
    itemLines.forEach(line => {
        const itemRegex = /((?:[a-zA-Z0-9]+[\s]*)+)(\d+\s*@[a-zA-Z\s$]*\d+\.\d+\s?[A-Z]*\s*[\d.]+)?\s*\$([\d.]+)/; // Regular expression to extract item data
        const matches = line.match(itemRegex);

        if (matches) {
            let [, item, quantitySection, totalValue] = matches;
            item = item.replace(/^\W+|\W+$/g, ''); // Remove non-word characters at the beginning and end of the item name
            const itemName = item.trim();
            const quantityMatch = quantitySection?.match(/(\d+)\s*@\s*\$[\d.]+/); // Extract the item quantity from the quantity section of the line
            const itemQuantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
            const eachPrice = (parseFloat(totalValue) / itemQuantity).toFixed(2); // Calculate the price per item
            formattedItems.push(`Item: ${itemName}, Quantity: ${itemQuantity}, Each Price: $${eachPrice}, Total Value: $${totalValue}`); // Add the formatted item data to the array
            prices.push(parseFloat(totalValue));
        }
    });

    // Extract the total sales value from the text data
    const totalSalesMatch = text.match(/Total Sales\s*\$([\d.]+)/);
    if (totalSalesMatch) {
        formattedItems.push(`Total Sales: $${totalSalesMatch[1]}`); // Add the total sales value to the array
    }

    console.log(prices);
    const maxValue = Math.max(...prices)
    console.log(maxValue)
    return maxValue;
}
