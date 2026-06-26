const form = document.getElementById('shoe-form');
const shoeIdInput = document.getElementById('shoe-id');
const nameInput = document.getElementById('name');
const brandInput = document.getElementById('brand');
const priceInput = document.getElementById('price');
const sizeInput = document.getElementById('size');
const statusInput = document.getElementById('status');
const shoeList = document.getElementById('shoe-list');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const saveButton = document.getElementById('save-button');
const modal = document.getElementById('shoe-modal');
const closeModalButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const totalCount = document.getElementById('total-count');
const availableCount = document.getElementById('available-count');
const outCount = document.getElementById('out-count');

function formatStatus(status) {
  return status === 'out of stock' ? 'Out of Stock' : 'Available';
}

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  nameInput.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function resetForm() {
  shoeIdInput.value = '';
  form.reset();
  modalTitle.textContent = 'Add product';
  saveButton.textContent = 'Create product';
  deleteButton.hidden = true;
}

function fillForm(shoe) {
  shoeIdInput.value = shoe._id;
  nameInput.value = shoe.name;
  brandInput.value = shoe.brand;
  priceInput.value = shoe.price;
  sizeInput.value = shoe.size;
  statusInput.value = shoe.status || 'available';
  modalTitle.textContent = shoe.name;
  saveButton.textContent = 'Update product';
  deleteButton.hidden = false;
}

function updateSummary(shoes) {
  const available = shoes.filter((shoe) => (shoe.status || 'available') === 'available').length;
  const outOfStock = shoes.filter((shoe) => shoe.status === 'out of stock').length;

  totalCount.textContent = shoes.length;
  availableCount.textContent = available;
  outCount.textContent = outOfStock;
}

async function loadShoes() {
  const response = await fetch('/api/shoes');
  const shoes = await response.json();

  shoeList.innerHTML = '';
  updateSummary(shoes);

  if (shoes.length === 0) {
    message.textContent = 'No products yet';
    shoeList.innerHTML = '<div class="empty-state">Add your first shoes product to start the catalog.</div>';
    return;
  }

  message.textContent = `${shoes.length} product${shoes.length === 1 ? '' : 's'}`;
  shoeList.innerHTML = `
    <div class="list-heading">
      <span>Product</span>
      <span>Price</span>
      <span>Size</span>
      <span>Updated</span>
      <span>Status</span>
    </div>
  `;

  shoes.forEach((shoe) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'shoe-row';
    const status = shoe.status || 'available';

    row.innerHTML = `
      <div>
        <div class="shoe-brand">${shoe.brand}</div>
        <h3>${shoe.name}</h3>
      </div>
      <span>$${shoe.price}</span>
      <span>${shoe.size}</span>
      <span>${new Date(shoe.updatedAt || shoe.createdAt).toLocaleDateString()}</span>
      <span class="status-badge ${status === 'available' ? 'available' : 'out'}">${formatStatus(status)}</span>
    `;

    row.addEventListener('click', () => {
      fillForm(shoe);
      openModal();
    });

    shoeList.appendChild(row);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    name: nameInput.value,
    brand: brandInput.value,
    price: Number(priceInput.value),
    size: Number(sizeInput.value),
    status: statusInput.value
  };

  const id = shoeIdInput.value;
  const url = id ? `/api/shoes/${id}` : '/api/shoes';
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  closeModal();
  resetForm();
  loadShoes();
});

deleteButton.addEventListener('click', async () => {
  const id = shoeIdInput.value;

  if (!id) {
    return;
  }

  await fetch(`/api/shoes/${id}`, {
    method: 'DELETE'
  });

  closeModal();
  resetForm();
  loadShoes();
});

addButton.addEventListener('click', () => {
  resetForm();
  openModal();
});

resetButton.addEventListener('click', resetForm);
closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target.dataset.action === 'close') {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

loadShoes();
