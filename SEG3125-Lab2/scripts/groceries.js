// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
    {
        name: "Trail Mix",
        lactose: true,
        nut: false,
        organic: false,
        price: 1,
    },
    {
        name: "Skim Milk",
        lactose: false,
        nut: true,
        organic: true,
        price: 4
    },
    {
        name: "Lay's Original Potato Chips",
        lactose: true,
        nut: true,
        organic: false,
        price: 2
    },
    {
        name: "Diet Pepsi",
        lactose: true,
        nut: true,
        organic: false,
        price: 1
    },
    {
        name: "Chicken Breast",
        lactose: true,
        nut: true,
        organic: true,
        price: 9
    },
    {
        name: "Vanilla Ice Cream",
        lactose: false,
        nut: true,
        organic: false,
        price: 1
    },
    {
        name: "Chocolate Hazelnut Ice Cream",
        lactose: false,
        nut: false,
        organic: false,
        price: 6
    },
    {
        name: "Carrots",
        lactose: true,
        nut: true,
        organic: true,
        price: 4
    },
    {
        name: "Alfredo Sauce",
        lactose: false,
        nut: true,
        organic: true,
        price: 4
    },
    {
        name: "Cup Noodles",
        lactose: true,
        nut: true,
        organic: false,
        price: 1
    }
].sort((a,b) => a.price-b.price);

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(lactose, prods, nuts, organic, none) {

    let product_names = [];

    
	for (let i=0; i<prods.length; i+=1) {
        // lactose and nut restrictions
        if ((lactose == true) && (prods[i].lactose == true) && (nuts == true) && (prods[i].nut == true)) {
            // organic restriction
            if (organic == true) {
                if (prods[i].organic == true) {
                    product_names.push(prods[i]);
                }
            }
            // no organic restriction
            else {
                product_names.push(prods[i]);
            }
        }
        // lactose restriction only
        else if ((lactose == true) && (prods[i].lactose == true)) {
            // organic restriction
            if (organic == true) {
                if (prods[i].organic == true) {
                    product_names.push(prods[i]);
                }
            }
            // no organic restriction
            else {
                product_names.push(prods[i]);
            }
        }
        // nut allergy only
        else if ((nuts == true) && (prods[i].nut == true)) {
            // organic restriction
            if (organic == true) {
                if (prods[i].organic == true) {
                    product_names.push(prods[i]);
                }
            }
            // no organic restriction
            else {
                product_names.push(prods[i]);
            }
        }
        // checking for organic preference only
        else if ((lactose == false) && (nuts == false)) {
            if (organic == true) {
                if (prods[i].organic == true) {
                    product_names.push(prods[i]);
                }
            }
            else {
                product_names.push(prods[i]);
            }
        }
        // if no restrictions
        else if (none == true) {
            // if prefer organic
            if (organic == true) {
                // and product is organic
				if(prods[i].organic == true){
					product_names.push(prods[i]);
				}
            }
            // if no organic preference
			else{
				product_names.push(prods[i]);
			}
		}
    }
	return product_names;
    
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}