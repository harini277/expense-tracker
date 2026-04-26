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

  transactions.forEach((t, index) => {
    total += t.amount;

    const li = document.createElement("li");

    // Color based on income/expense
    if (t.amount > 0) {
      li.style.color = "lightgreen";
    } else {
      li.style.color = "red";
    }

    li.innerText = `${t.desc}: ₹${t.amount}`;

    // Delete button
    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.onclick = () => {
      transactions.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(transactions));
      updateUI();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });

  balance.innerText = total;
}

// Show balance on button click
function showBalance() {
  document.getElementById("balanceBox").style.display = "block";
}

// Initial load
updateUI();