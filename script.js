document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadRecords();
    setDefaultDateTime();
});

function setDefaultDateTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('entryDateTime').value = now.toISOString().slice(0, 16);
}

function saveProfile() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const loc = document.getElementById('location').value.trim();
    const qty = document.getElementById('fixedQuantity').value.trim();

    if (!name || !phone || !loc || !qty) {
        alert("कृपया पहले प्रोफाइल की सभी डिटेल्स भरें!");
        return;
    }

    const profile = { name, phone, loc, qty };
    localStorage.setItem('doodhProfile', JSON.stringify(profile));
    lockInputs(true);
}

function lockInputs(isLocked) {
    document.getElementById('customerName').disabled = isLocked;
    document.getElementById('phone').disabled = isLocked;
    document.getElementById('location').disabled = isLocked;
    document.getElementById('fixedQuantity').disabled = isLocked;

    if (isLocked) {
        document.getElementById('saveProfileBtn').style.display = 'none';
        document.getElementById('editProfileBtn').style.display = 'block';
    } else {
        document.getElementById('saveProfileBtn').style.display = 'block';
        document.getElementById('editProfileBtn').style.display = 'none';
    }
}

function unlockProfile() {
    lockInputs(false);
}

function loadProfile() {
    const savedProfile = localStorage.getItem('doodhProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        document.getElementById('customerName').value = profile.name;
        document.getElementById('phone').value = profile.phone;
        document.getElementById('location').value = profile.loc;
        document.getElementById('fixedQuantity').value = profile.qty;
        lockInputs(true);
    }
}

function addDailyEntry() {
    const savedProfile = localStorage.getItem('doodhProfile');
    if (!savedProfile) {
        alert("पहले ऊपर प्रोफाइल सेटिंग्स भरकर 'प्रोफाइल लॉक करें' पर क्लिक करें!");
        return;
    }

    const profile = JSON.parse(savedProfile);
    const dateTime = document.getElementById('entryDateTime').value;

    if (!dateTime) {
        alert("कृपया सही तारीख और समय चुनें!");
        return;
    }

    const formattedDate = new Date(dateTime).toLocaleString('hi-IN');

    const newEntry = {
        id: Date.now(),
        dateTime: formattedDate,
        name: profile.name,
        quantity: profile.qty
    };

    let records = JSON.parse(localStorage.getItem('doodhRecords')) || [];
    records.push(newEntry);
    localStorage.setItem('doodhRecords', JSON.stringify(records));
    renderRecords();
    setDefaultDateTime(); 
}

function renderRecords() {
    const recordsBody = document.getElementById('recordsBody');
    recordsBody.innerHTML = '';
    const records = JSON.parse(localStorage.getItem('doodhRecords')) || [];

    records.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.dateTime}</td>
            <td>${entry.name}</td>
            <td>${entry.quantity}</td>
            <td><button onclick="deleteEntry(${entry.id})" style="background-color:#f44336; color:white; border:none; padding:5px 10px; cursor:pointer;">डिलीट</button></td>
        `;
        recordsBody.appendChild(row);
    });
}

function deleteEntry(id) {
    if (confirm("क्या आप इस रिकॉर्ड को डिलीट करना चाहते हैं?")) {
        let records = JSON.parse(localStorage.getItem('doodhRecords')) || [];
        records = records.filter(entry => entry.id !== id);
        localStorage.setItem('doodhRecords', JSON.stringify(records));
        renderRecords();
    }
}

function loadRecords() {
    renderRecords();
                                 }
