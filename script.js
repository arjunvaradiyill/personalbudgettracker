const incomeForm = document.getElementById("incomeForm");
const incomeAmount = document.getElementById("incomeAmount");
const expenseForm = document.getElementById("expenseForm");
const expenseAmount = document.getElementById("expenseAmount");
const expenseDesc = document.getElementById("expenseDesc");
const expenseCategory = document.getElementById("expenseCategory");
const displayIncome = document.getElementById("displayIncome");
const displayBalance = document.getElementById("displayBalance");
const expenseTableBody = document.querySelector("#expenseTable tbody");
const totalExpensesEl = document.getElementById("totalExpenses");

let income = 0;
let expenses = [];

// Handle income submission
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  income = parseInt(incomeAmount.value);
  incomeAmount.value = "";
  displayIncome.textContent = `Income is Rs ${income}`;
  updateBalance();
});

// Handle expense submission
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const expense = {
    id: Date.now(), // Unique ID for the expense
    description: expenseDesc.value,
    amount: parseInt(expenseAmount.value),
    category: expenseCategory.value,
  };
  expenses.push(expense);
  expenseDesc.value = "";
  expenseAmount.value = "";
  expenseCategory.value = "Food";
  addExpenseToTable(expense);
  updateBalance();
});

// Add expense to table
const addExpenseToTable = (expense) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${expense.description}</td>
    <td>${expense.amount}</td>
    <td>${expense.category}</td>
    <td><span class="delete-btn" data-id="${expense.id}">Delete</span></td>
  `;
  expenseTableBody.appendChild(row);

  // Add event listener to delete button
  row.querySelector(".delete-btn").addEventListener("click", () => {
    deleteExpense(expense.id);
  });
};

// Update balance and total expenses
const updateBalance = () => {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const balance = income - totalExpenses;
  displayBalance.textContent = `Balance is Rs ${balance}`;
  totalExpensesEl.textContent = totalExpenses;
};

// Delete expense from table and array
const deleteExpense = (id) => {
  // Remove from the array
  expenses = expenses.filter((expense) => expense.id !== id);

  // Remove from the DOM
  const rowToDelete = document.querySelector(`.delete-btn[data-id="${id}"]`)
    .parentElement.parentElement;
  rowToDelete.remove();

  // Update the balance
  updateBalance();
};
