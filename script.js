let transactions = JSON.parse(localStorage.getItem("data")) || [];

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = Number(document.getElementById("amount").value);

  if (!desc || !amount) return;

  const transaction = { desc, amount };
  transactions.push(transaction);

  localStorage.setItem("data", JSON.stringify(transactions));

  updateUI();
}

function updateUI() {
  const list = document.getElementById("list");
  const balance = document.getElementById("balance");

  list.innerHTML = "";

  let total = 0;

  transactions.forEach(t => {
    total += t.amount;

    const li = document.createElement("li");
    li.innerText = `${t.desc}: ₹${t.amount}`;
    list.appendChild(li);
  });

  balance.innerText = total;
}

updateUI();