let transactions = JSON.parse(localStorage.getItem("data")) || [];

function addTransaction() {
  const desc = document.getElementById("desc").value;
  let amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || !amount) return;

  // Fix logic
  if (type === "expense") {
    amount = -Math.abs(amount);
  } else {
    amount = Math.abs(amount);
  }

  transactions.push({ desc, amount });

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

    li.innerText = `${t.desc}: ₹${Math.abs(t.amount)}`;

    li.style.color = t.amount > 0 ? "lightgreen" : "red";

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

function showBalance() {
  document.getElementById("balanceBox").style.display = "block";
}

updateUI();