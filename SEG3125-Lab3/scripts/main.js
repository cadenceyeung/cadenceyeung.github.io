// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

// function openInfo(evt, tabName) {

// 	// Get all elements with class="tabcontent" and hide them
// 	tabcontent = document.getElementsByClassName("tabcontent");
// 	for (i = 0; i < tabcontent.length; i++) {
// 		tabcontent[i].style.display = "none";
// 	}

// 	// Get all elements with class="tablinks" and remove the class "active"
// 	tablinks = document.getElementsByClassName("tablinks");
// 	for (i = 0; i < tablinks.length; i++) {
// 		tablinks[i].className = tablinks[i].className.replace(" active", "");
// 	}

// 	// Show the current tab, and add an "active" class to the button that opened the tab
// 	document.getElementById(tabName).style.display = "block";
// 	evt.currentTarget.className += " active";

// }

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
	document.getElementById("nextBtn").innerHTML = "PLACE ORDER";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
	//...the form gets submitted:
	alert("ORDER CONFIRMED: Sit tight, your groceries are on the way!");
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}


	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2, slct3, slct4) {

  var s1 = document.getElementsByName(slct1);
	var s2 = document.getElementById(slct2);
	var s3 = document.getElementsByName(slct3);
	var s4 = document.getElementsByName(slct4);
  
  var choice = [s1, s3, s4];


  for (i = 0; i < 3; i++) {
    choice[i] = false;
  }

  s1
  .forEach(radio => {
    if(radio.checked) {
      if (radio.value == "LactoseNo") {
        choice[0] = false;
      } else if (radio.value == "LactoseYes") {
          choice[0] = true;
      }
    }
  });

  s3
  .forEach(radio => {
    if(radio.checked) {
      if (radio.value == "NutNo") {
        choice[1] = false;
      } else if (radio.value == "NutYes") {
          choice[1] = true;
      }
    }
  });

  s4
  .forEach(radio => {
    if(radio.checked) {
      if (radio.value == "OrganicNo") {
        choice[2] = false;
      } else if (radio.value == "OrganicYes") {
          choice[2] = true;
      }
    }
  });

	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
	s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
	var optionArray = restrictListProducts(choice[0], products, choice[1], choice[2]);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	for (i = 0; i < optionArray.length; i++) {
			
		var productName = optionArray[i].name;
		var productPrice = optionArray[i].price;
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
    checkbox.value = productName;
		s2.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
        var label1 = document.createElement('label');
        var label2 = document.createElement('label');
        label1.htmlFor = productName;
        label2.htmlFor = productPrice;
        label1.appendChild(document.createTextNode(productName));
		    label2.appendChild(document.createTextNode(productPrice));
        s2.appendChild(label1);
        s2.appendChild(document.createTextNode(" (Price: $"));
        s2.appendChild(label2);
        s2.appendChild(document.createTextNode(")"));
		
		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));      
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is $" + getTotalPrice(chosenProducts)));
		
}
