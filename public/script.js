let editingId = null;

async function loadBookings() {
  const res = await fetch('/api/bookings');
  const bookings = await res.json();
  const list = document.getElementById('bookingList');
  list.innerHTML = '';
  bookings.forEach(b => {
    const li = document.createElement('li');
    li.textContent = `${b.name} - ${b.service} on ${b.date} at ${b.time}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => startEdit(b);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteBooking(b.id);

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}


window.onload = loadBookings;
