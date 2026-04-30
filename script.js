let transactions = JSON.parse(localStorage.getItem("data")) || [];

function addTransaction() {
  const desc = document.getElementById("desc").value;
  let amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;

  if (!desc || !amount || !date) {
    alert("Fill all fields");
    return;
  }

  amount = type === "expense" ? -Math.abs(amount) : Math.abs(amount);

  transactions.push({ desc, amount, date });

  localStorage.setItem("data", JSON.stringify(transactions));

  updateUI();
}

function updateUI() {
  const container = document.getElementById("list");
  const balance = document.getElementById("balance");

  container.innerHTML = "";

  let totalBalance = 0;

  // Group by date
  const grouped = {};

  transactions.forEach(t => {
    if (!grouped[t.date]) grouped[t.date] = [];
    grouped[t.date].push(t);
  });

  for (let date in grouped) {
    const section = document.createElement("div");
    section.className = "date-section";

    const title = document.createElement("h3");
    title.innerText = `📅 ${date}`;
    section.appendChild(title);

    const table = document.createElement("table");

    let dailyTotal = 0;

    grouped[date].forEach(t => {
      dailyTotal += t.amount;
      totalBalance += t.amount;

      const row = document.createElement("tr");

      const desc = document.createElement("td");
      desc.innerText = t.desc;

      const amt = document.createElement("td");

      if (t.amount > 0) {
        amt.innerText = `+ ₹${t.amount}`;
        amt.className = "income";
      } else {
        amt.innerText = `- ₹${Math.abs(t.amount)}`;
        amt.className = "expense";
      }

      const del = document.createElement("td");
      const btn = document.createElement("button");
      btn.innerText = "❌";
      btn.onclick = () => {
        const index = transactions.indexOf(t);
        transactions.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(transactions));
        updateUI();
      };

      del.appendChild(btn);

      row.appendChild(desc);
      row.appendChild(amt);
      row.appendChild(del);

      table.appendChild(row);
    });

    section.appendChild(table);

    const daily = document.createElement("div");

    if (dailyTotal >= 0) {
      daily.innerText = `Daily Total: + ₹${dailyTotal}`;
      daily.className = "daily-total income";
    } else {
      daily.innerText = `Daily Total: - ₹${Math.abs(dailyTotal)}`;
      daily.className = "daily-total expense";
    }

    section.appendChild(daily);

    container.appendChild(section);
  }

  balance.innerText = totalBalance;
}

function showBalance() {
  document.getElementById("balanceBox").style.display = "block";
}
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
updateUI();