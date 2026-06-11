const buttons = document.querySelectorAll(".filtro button");
const produtos = document.querySelectorAll(".produto");

let cart = 0;
const cartCount = document.getElementById("cart-count");
const toast = document.getElementById("toast");

// FILTRO
buttons.forEach(btn=>{
btn.addEventListener("click",()=>{

buttons.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

const cat = btn.dataset.cat;

produtos.forEach(p=>{
p.style.display = (cat==="todos" || p.dataset.cat===cat) ? "block" : "none";
});

});
});

// CARRINHO
document.querySelectorAll(".add").forEach(btn=>{
btn.addEventListener("click",()=>{

cart++;
cartCount.textContent = cart;

// toast
toast.style.opacity = "1";
toast.style.transform = "translateY(0)";

setTimeout(()=>{
toast.style.opacity = "0";
toast.style.transform = "translateY(20px)";
},1500);

});
});