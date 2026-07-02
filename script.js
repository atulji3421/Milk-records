document.getElementById('add-btn').addEventListener('click', function() {
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    const name = nameInput.value;
    const date = dateInput.value;

    if (name && date) {
        const li = document.createElement('li');
        li.textContent = `Name: ${name}, Date: ${date}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(deleteBtn);
        document.getElementById('records-list').appendChild(li);

        nameInput.value = '';
        dateInput.value = '';
    } else {
        alert('Please enter both name and date.');
    }
});
