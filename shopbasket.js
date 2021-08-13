// All store products
const products = [ 
    {
      name: 'Model Airplane',
      price: 15,
    },
    {
      name: 'WW2 Mug',
      price: 4,
    },
    {
      name: 'WW2 Image',
      price: 10,
    },
  ]
  
  
  let cart = {
    items: [],
    totalPrice: 0
  }
  
  // Render all products so they are all visible on the products list on the store page
  function renderAllProducts() {
    const productTable = document.getElementById('products') // References the table in the HTML with the id of "products"
    productTable.innerHTML = ''
    products.forEach((product, index) => { // Manipulates the products table.... adds a new column for each product using the products array above
      productTable.innerHTML += `
      <tr>
      <td>${product.name}</td>
      <td>£${product.price}</td>
      <td><button class="btn btn-sucess" onclick="addToCart(${index})">Add To Cart</button></td> <!-- Button for each item that adds the corresponding item to the cart if clicked -->
      </tr>
      `
    })
  }
  
  function renderAllCartItems() {
    const cartItemTable = document.getElementById('cart-items') // the table in the HTML with the id of "cart-items"
    const totalPriceElement = document.getElementById('total-price') // the text element in the HTML with the id of "total-price"
    let totalPrice = 0
    cartItemTable.innerHTML = ''
    if(cart.items.length === 0) { // If there are no items in the shopping cart display the following message
      cartItemTable.innerHTML = `
      <tr>
      <td colspan="5">There are no items in your cart yet.</td>
      </tr>
      `
    }
    cart.items.forEach((cartItem, index) => { // Manipulates the cart-items table by adding a new column for a product if one has been added to the cart
      totalPrice += cartItem.total // totalPrice = totalPrice + cartItem.total...... adds all the cartItem.total 
      cartItemTable.innerHTML += `
      <tr>
      <td>${cartItem.name}</td>
      <td>£${cartItem.price}</td>
      <td>${cartItem.quantity}</td>
      <td>£${cartItem.total}</td>
      <td><button class="btn btn-danger" onclick="removeFromCart('${cartItem.name}')">Remove From Cart</button></td> <!-- Removes from cart when button is clicked -->
      </tr>
      `
    })
    totalPriceElement.innerText = `Total: £${totalPrice}` // Display the totalPrice variable calculation
  }
  
  // Adds products to cart
  function addToCart(productIndex) {
    const product = products[productIndex] 
    let isAlreadyInCart = false
    let newCartItems = cart.items.reduce((state, item) => { // Uses the reduce method on cart items
      if(item.name === product.name) { // If item name is the same as product name then do the following aka add 1 to item quantity and 1 of the item price to the item total
        isAlreadyInCart = true
        const newItem = {
          ...item,
          quantity: item.quantity + 1,
          total: (item.quantity + 1) * item.price
        }
        return [...state, newItem];
      }
      return [...state, item]
    }, [])
  
    if(!isAlreadyInCart) { // If is not already in cart then move that item to cart (uses the push method)
      newCartItems.push({
        ...product,
        quantity: 1,
        total: product.price,
      })
    }
  
    cart = { // Updates cart
      ...cart,
      items: newCartItems,
    }
  
    renderAllCartItems(); // Calls function
  }
  
  // Removes products from cart
  function removeFromCart(productName) {
    let newCartItems = cart.items.reduce((state, item) => { // Uses the reduce method on cart items
      if(item.name === productName) { // If item name is the same as product name then do the following aka take one away from the item quantity and 1 of the item price from the item total 
        const newItem = {
          ...item,
          quantity: item.quantity - 1,
          total: (item.quantity - 1) * item.price
        }
        if(newItem.quantity > 0) { // If the amount of the item is still more than zero then return the newItem values
          return [...state, newItem];
        }
        
        return state
      }
      return [...state, item]
    }, [])
  
    cart = { // Updates Cart
      ...cart,
      items: newCartItems
    }
    renderAllCartItems() // Calls function
  }
  
  renderAllProducts() // Calls function
  renderAllCartItems() // Calls function
  
  
  
  
  