let expenses = [];

function addExpense() {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const expense = {
        id: Date.now(),
        description: description,
        amount: amount
    };
    expenses.push(expense);
    updateExpenses();
    clearInputs();
}

function updateExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.dataset.id = expense.id;
        li.innerHTML = `
            <span>${expense.description}: $${expense.amount.toFixed(2)}</span>
            <button onclick="editExpense(${expense.id})">Edit</button>
            <button onclick="removeExpense(${expense.id})">Remove</button>
        `;
        expenseList.appendChild(li);
    });

    updateTotal();
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenses();
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

function clearInputs() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function editExpense(id) {
    const expense = expenses.find(expense => expense.id === id);
    if (expense) {
        const descriptionInput = document.getElementById('description');
        const amountInput = document.getElementById('amount');

        descriptionInput.value = expense.description;
        amountInput.value = expense.amount;

        removeExpense(id);
    }
}
