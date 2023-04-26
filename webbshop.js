// make sure that the html page is loaded so that the js can run
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready) // will run js as soon as the page is ready
} else { // if already done loading
    ready()
}

function ready() { // put in a piece of js to run to start js script after html page has loaded

    var quantityInputs = document.getElementsByClassName('amount') // checking quantity in total price
    for (var i=0; i<quantityInputs.length; i++) {
        var input = quantityInputs[i]
        /*if (less.addEventListener('click', quantityChanged)) {
            quantityInputs.innerText+1
        }
        if (more.addEventListener('click', quantityChanged)) {
            quantityInputs.innerText-1
        }*/
        input.addEventListener('click', quantityChanged) // function for quantityChanged is futher down below
    }

    var addCart = document.getElementsByClassName('addCart') // adding products to cart
    for (var i=0; i<addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }

    //var less = document.getElementsByClassName('less')[0].addEventListener('click', subAmount)
    //var more = document.getElementsByClassName('more')[0].addEventListener('click', addAmount)
    var amountElement = document.querySelector('.amount')
    var lessButton = document.querySelector('.less').addEventListener('clicked', () => {
        let amountValue = parseInt(amountElement.innerText) // current value of amount
        if (amountValue > 1) { //decrease amount
            amountValue--;
        }
        amountElement.innerText = amountValue.toString()
    })
    var moreButton = document.querySelector('.more').addEventListener('clicked', () => {
        let amountValue = parseInt(amountElement.innerText) // current value of amount
        if (amountValue > 1) { //decrease amount
            amountValue++;k
        }
        amountElement.innerText = amountValue.toString()
    })

    document.getElementsByClassName('töm')[0].addEventListener('click', trashClicked)
    document.getElementsByClassName('kassan')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem() {
    // shoppingcart, remove buttons
    var removeCartItem = document.getElementsByClassName('remove') // removing products from cart
    console.log(removeCartItem)
    for (var i=0; i<removeCartItem.length; i++) {
        var button = removeCartItem[i];
        button.addEventListener('click', function(event) { // button for removing individual products from cartlist
            console.log('clicked');
            var buttonClicked = event.target
            buttonClicked.parentElement.remove()
            updateCartTotal()
        })
    }
}


let openmenu=false;

function openMenu() { // opening and closing menu
    if(openmenu) {
        document.getElementById("menubar").style.width = "0px";
        openmenu =false;
    } else {
        document.getElementById("menubar").style.width = "260px";
        openmenu =true;
    }
}

let opencart=false;

function openCart() { // opening and closing shoppingcart
    if(opencart) {
        document.getElementById("cartmenu").style.width = "0px";
        document.body.style.backgroundColor = "#d6dfe2"; // resetting backcground
        opencart = false;
    } else {
        document.getElementById("cartmenu").style.width = "600px";
        document.body.style.backgroundColor = "#737b7e"; // darkening background to focus on cartlist
        opencart = true;
    }
}


/*function addAmount() {
    document.getElementsByClassName('amount')[0] += 1;
}
function subAmount(){
    document.getElementsByClassName('amount')[0] -= 1;
}*/


function addCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText // [0] is the first element int the array getElement returns
    var price = shopItem.getElementsByClassName('pris')[0].innerText
    var description = shopItem.getElementsByClassName('detaljer')[0].innerText
    console.log(title, price)
    var imageSrc = shopItem.getElementsByClassName('produktbild') [0].src //innertext för bilder
    addItemCart(title, price, imageSrc, description)
    updateCartTotal()
}


function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }// an if statement to check if input is not a number or below zero
    //if input is outside parameters the quantity will automatically go back to 1
    updateCartTotal()
}


// adding a row to cartlist
function addItemCart(title, price, imageSrc, description) {
    var cartRow = document.createElement('div') // create a div for the productrow
    cartRow.classList.add('vara') // styling the new row like the ones before
    var cartItems = document.getElementsByClassName('cartItems')[0]
    /*var cartItemNames = cartItems.getElementsByClassName('varutitel')
    for (var i=0; i<cartItemNames.length; i++) { // checking if the product is already in cartlist
        if (cartItemNames[i].innerText == title)
            alert('Den här produkten finns redan i din varukorg')
            return // exit the function and stop anything below it
    }*/
    var cartRowContent = `
        <img class="varubild" src="${imageSrc}">
        <h2 class="varutitel">${title}</h2>
        <p class="varudetaljer">${description}</p>
        <div class="counter">
            <img onclick="manageAmount()" class="less" src="./img/minus-sign.png">
            <span class="amount">1</span>
            <img onclick="manageAmount()" class="more" src="./img/plus.png">
        </div>
        <span class="varupris">${price}</span>
        <img class="remove" src="./img/close.png">` // import div of row from the html page
        //uses imageSrc as a variable in order to change the product added in the row
    cartRow.innerHTML = cartRowContent // innerHTML for HTML tags inside import instead of just text
    cartItems.append(cartRow) // adding row to the end of the list
    removeCartItem()
    //cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem) // add function to the remove button of the new div
    cartRow.getElementsByClassName('amount')[0].addEventListener('change', quantityChanged) // add quantity to the total of the new div
}

//amount
function purchaseClicked () {
    alert('Tack för att ni använde vår webbshop!')
    var cartItem = document.getElementsByClassName('cartItems')[0]
    while (cartItem.hasChildNodes()) {
        cartItem.removeChild(cartItem.firstChild)
    }
}

function trashClicked () {
    var cartItem = document.getElementsByClassName('cartItems')[0]
    while (cartItem.hasChildNodes()) {
        cartItem.removeChild(cartItem.firstChild)
    }
}


//update the total cost for purchase
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cartItems')[0]
    var cartRows = cartItemContainer.getElementsByClassName('vara')
    var total = 0
    for (var i=0; i<cartRows.length; i++) {
        var cartRow = cartRows[i]
        //price
        var priceElement = cartRow.getElementsByClassName('varupris') [0]
        //quantity
        var quantityElement = cartRow.getElementsByClassName('amount')[0]
        console.log('priceElement, quantityElement')
        var price = parseFloat(priceElement.innerText.replace('/st', '')) //removes extra characters and adds quantity to total as float
        var quantity = quantityElement.innerText // innerText = value of span, value = value of input
        console.log(price)
        total = total + (price * quantity)
        console.log(price * quantity)
    }
    total = Math.round(total * 100) / 100 // round total price to two decimals
    document.getElementsByClassName('total') [0].innerText = total + ' kr'
}
