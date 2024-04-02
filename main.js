const addProductBtn = document.getElementById('addProductBtn');
const filter = document.getElementById('filter');
const total = document.getElementById('total');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close');
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

let products = [];

function openModal() {
  modal.style.display = 'block';
}

function closeModalFn() {
  modal.style.display = 'none';
}

function renderProduct(product) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${product.meal}: </strong>${product.name} - ${product.calories} кал, ${product.fat} ж, ${product.carbs} уг, ${product.protein} бел`;
  productList.appendChild(li);
}

function updateTotal() {
  let totalCalories = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  let totalProtein = 0;

  products.forEach(product => {
    totalCalories += product.calories;
    totalFat += product.fat;
    totalCarbs += product.carbs;
    totalProtein += product.protein;
  });

  total.innerHTML = `<strong>Общее количество:</strong> ${totalCalories} кал, ${totalFat} ж, ${totalCarbs} уг, ${totalProtein} бел`;
}

addProductBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFn);

productForm.addEventListener('submit', e => {
  e.preventDefault();
  const meal = document.getElementById('meal').value;
  const name = document.getElementById('name').value;
  const calories = parseInt(document.getElementById('calories').value);
  const fat = parseInt(document.getElementById('fat').value);
  const carbs = parseInt(document.getElementById('carbs').value);
  const protein = parseInt(document.getElementById('protein').value);

  const product = { meal, name, calories, fat, carbs, protein };
  products.push(product);
  renderProduct(product);
  updateTotal();
  closeModalFn();
});

filter.addEventListener('change', e => {
  const value = e.target.value;
  productList.innerHTML = '';
  if (value === 'all') {
    products.forEach(product => renderProduct(product));
  } else {
    const filteredProducts = products.filter(product => product.meal === value);
    filteredProducts.forEach(product => renderProduct(product));
  }
});

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
