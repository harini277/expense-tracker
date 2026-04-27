let transactions = JSON.parse(localStorage.getItem("data")) || [];

function addTransaction() {
  const desc = document.getElementById("desc").value;
  let amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;

  if (!desc || !amount || !date) {
    alert("Please fill all fields");
    return;
  }

  if (type === "expense") {
    amount = -Math.abs(amount);
  } else {
    amount = Math.abs(amount);
  }

  transactions.push({ desc, amount, date });

  localStorage.setItem("data", JSON.stringify(transactions));

  updateUI();
}

function updateUI() {
  const list = document.getElementById("list");
  const balance = document.getElementById("balance");

  list.innerHTML = "";

  let totalBalance = 0;

  // Group transactions by date
  const grouped = {};

  transactions.forEach(t => {
    if (!grouped[t.date]) {
      grouped[t.date] = [];
    }
    grouped[t.date].push(t);
  });

  // Loop through each date
  for (let date in grouped) {
    const dateHeader = document.createElement("h3");
    dateHeader.innerText = `📅 ${date}`;
    list.appendChild(dateHeader);

    let dailyTotal = 0;

    grouped[date].forEach(t => {
      dailyTotal += t.amount;
      totalBalance += t.amount;

      const li = document.createElement("li");

      li.innerText = `${t.desc}: ₹${Math.abs(t.amount)}`;
      li.style.color = t.amount > 0 ? "lightgreen" : "red";

      const btn = document.createElement("button");
      btn.innerText = "❌";
      btn.onclick = () => {
        const index = transactions.indexOf(t);
        transactions.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(transactions));
        updateUI();
      };

      li.appendChild(btn);
      list.appendChild(li);
    });

    // Daily total
    const daily = document.createElement("p");
    daily.innerText = `Daily Total: ₹${dailyTotal}`;
    list.appendChild(daily);
  }

  balance.innerText = totalBalance;
}

// Show overall balance
function showBalance() {
  document.getElementById("balanceBox").style.display = "block";
}

updateUI();