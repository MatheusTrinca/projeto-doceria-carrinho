// Show Cart
document.getElementById("cart-info").addEventListener("click", () => {
  const cart = document.getElementById("cart");
  cart.classList.toggle("show-cart");
});

// Add Items to cart
const cartBtn = document.querySelectorAll('.store-item-icon');
cartBtn.forEach(btn=> {
  btn.addEventListener('click', (e) => {
    if(e.target.parentElement.classList.contains('store-item-icon')){
      let fullPath = e.target.parentElement.previousElementSibling.src;
      let pos = fullPath.indexOf('img') + 3; // Contando as letras da string até começar o img e acrescentando os 3 caracteres do img
      let partialPath = fullPath.slice(pos); // pega da posição passada até o final
      let name = e.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
      let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].children[0].textContent;

      const item = {};
      item.img = `img-cart${partialPath}`;
      item.name = name;
      item.price = price;

      addItem(item);
      console.log(item);
    }
  });
});

function addItem(item){
  let cart = document.getElementById('cart');
  let before = document.getElementById('cart-total-container');
  let div = document.createElement('div');
  div.className = 'cart-item d-flex justify-content-between my-3';
  let newItem = `
      <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
      <div class="item-text">
        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
        <span>R$</span>
        <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
      </div>
      <a href="#" id="cart-item-remove" class="cart-item-remove"><i class="fas fa-trash"></i></a>
  `
  div.innerHTML = newItem;
  cart.insertBefore(div, before);
  alert('Item adicionado ao carrinho');
  showTotals();
}

function showTotals(){
  const cartItems = document.querySelectorAll('.cart-item-price');
  const total = [];

  cartItems.forEach(item => total.push(item.textContent));

  // Reduce recebe o array, o iterável(variavel qualquer) e 0 no caso de soma e 1 no caso de multiplicacao -> e retorna
  const totalMoney = total.reduce((total, item) => {
    total += parseFloat(item);
    return total;
  }, 0);

  const finalMoney = totalMoney.toFixed(2);

  document.getElementById('cart-total').textContent = finalMoney;
  document.getElementById('item-count').textContent = total.length;
  document.querySelector('.item-total').textContent = finalMoney;
  
  removeCart();

}

function removeCart(){
 
  //remover
  document.getElementById('cart').addEventListener('click', (e) => {
    if(e.target.parentElement.classList.contains('cart-item-remove')){
      e.target.parentElement.parentElement.remove();
      showTotals();
    }
  });
  // Remover todo o carrinho
  document.getElementById('clear-cart').addEventListener('click', () =>{
    const cartItems = document.getElementById('cart');
    while(cartItems.children[0].classList.contains('cart-item')){
        cartItems.removeChild(cartItems.children[0]);
        showTotals();
    }
  })
    
  
}