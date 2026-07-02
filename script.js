function addRecord() {
  const name = document.getElementById('cName').value;
  const phone = document.getElementById('cPhone').value;
  const location = document.getElementById('cLocation').value;
  const milk = document.getElementById('mMilk').value;
  
  if(!name || !phone || !location || !milk) {
    alert('Please fill all details');
    return;
  }
  
  const quantity = parseFloat(milk);
  if(quantity < 100 || quantity > 100000) {
    alert('Quantity must be between 100 ml and 100,000 ml');
    return;
  }

  const table = document.getElementById('recordsTable');
  const row = table.insertRow(-1);
  const date = new Date().toLocaleString();
  
  row.innerHTML = `<td>${date}</td><td>${name}<br><small>${phone}</small><br><small>${location}</small></td><td>${milk} ml</td><td><button class='btn-danger' onclick='deleteRow(this)'>Delete Entry</button></td>`;
}

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
