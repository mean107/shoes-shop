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

async function loadShoes() {
  const response = await fetch('/api/shoes');
  const shoes = await response.json();

  shoeList.innerHTML = '';

  if (shoes.length === 0) {
    message.textContent = 'No products yet.';
    return;
  }

  message.textContent = '';

  shoes.forEach((shoe) => {
    const card = document.createElement('div');
    card.className = 'shoe-card';

    card.innerHTML = `
      <h3>${shoe.name}</h3>
      <div class="shoe-meta">
        Brand: ${shoe.brand} | Price: $${shoe.price} | Size: ${shoe.size} | Status: ${shoe.status}
      </div>
      <div class="card-actions">
        <button type="button" class="secondary" data-action="edit">Edit</button>
        <button type="button" class="danger" data-action="delete">Delete</button>
      </div>
    `;

    card.querySelector('[data-action="edit"]').addEventListener('click', () => {
      shoeIdInput.value = shoe._id;
      nameInput.value = shoe.name;
      brandInput.value = shoe.brand;
      priceInput.value = shoe.price;
      sizeInput.value = shoe.size;
      statusInput.value = shoe.status || 'available';
    });

    card.querySelector('[data-action="delete"]').addEventListener('click', async () => {
      await fetch(`/api/shoes/${shoe._id}`, {
        method: 'DELETE'
      });

      resetForm();
      loadShoes();
    });

    shoeList.appendChild(card);
  });
}

function resetForm() {
  shoeIdInput.value = '';
  form.reset();
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

  resetForm();
  loadShoes();
});

resetButton.addEventListener('click', resetForm);

loadShoes();