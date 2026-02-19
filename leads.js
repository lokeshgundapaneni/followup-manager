if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

document.getElementById("logout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

const tableBody = document.getElementById("table-body");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let leads = JSON.parse(localStorage.getItem("leads")) || [];

function updateStats() {
  document.getElementById("stat-total").textContent = leads.length;
  document.getElementById("stat-new").textContent = leads.filter(function (l) { return l.status === "New"; }).length;
  document.getElementById("stat-contacted").textContent = leads.filter(function (l) { return l.status === "Contacted"; }).length;
  document.getElementById("stat-closed").textContent = leads.filter(function (l) { return l.status === "Closed"; }).length;
}

function getFollowUpDisplay(dateStr) {
  if (!dateStr) return { text: "—", cls: "" };

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var date = new Date(dateStr);
  var diff = Math.round((date - today) / (1000 * 60 * 60 * 24));
  var formatted = date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  if (diff < 0)  return { text: formatted + " (Overdue)", cls: "overdue" };
  if (diff === 0) return { text: "Today", cls: "due-today" };
  if (diff <= 3)  return { text: formatted + " (" + diff + "d)", cls: "due-today" };
  return { text: formatted, cls: "upcoming" };
}

function getStatusBadge(status) {
  var classMap = {
    New: "s-badge-new",
    Contacted: "s-badge-contacted",
    Closed: "s-badge-closed"
  };
  var cls = classMap[status] || "";
  return '<span class="status-badge ' + cls + '">' + status + '</span>';
}

function renderLeads(list) {
  tableBody.innerHTML = "";

  if (list.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📋</div><p>No leads found. <a href="add-lead.html" style="color:var(--accent2)">Add one →</a></p></div></td></tr>';
    return;
  }

  list.forEach(function (lead, i) {
    var realIndex = leads.indexOf(lead);
    var fu = getFollowUpDisplay(lead.followUpDate);

    var row = document.createElement("tr");
    row.innerHTML =
      '<td style="color:var(--muted);font-size:0.82rem">' + (i + 1) + '</td>' +
      '<td>' +
        '<div class="lead-name">' + lead.name + '</div>' +
        '<div class="lead-phone">' + lead.phone + '</div>' +
        (lead.email ? '<div class="lead-email">' + lead.email + '</div>' : '') +
      '</td>' +
      '<td style="color:var(--muted);font-size:0.85rem">' + (lead.requirement || "—") + '</td>' +
      '<td class="' + fu.cls + '">' + fu.text + '</td>' +
      '<td>' + getStatusBadge(lead.status) + '</td>' +
      '<td><div class="action-cell">' +
        '<button class="btn-edit" onclick="editLead(' + realIndex + ')">Edit</button>' +
        '<button class="btn-danger" onclick="deleteLead(' + realIndex + ')">Delete</button>' +
      '</div></td>';

    tableBody.appendChild(row);
  });
}

function applyFilters() {
  var searchText = searchInput.value.toLowerCase().trim();
  var statusValue = statusFilter.value;

  var filtered = leads.filter(function (lead) {
    var matchSearch = !searchText ||
      lead.name.toLowerCase().includes(searchText) ||
      lead.phone.includes(searchText) ||
      (lead.email && lead.email.toLowerCase().includes(searchText));

    var matchStatus = statusValue === "all" || lead.status === statusValue;

    return matchSearch && matchStatus;
  });

  renderLeads(filtered);
}

function deleteLead(index) {
  if (!confirm('Delete lead "' + leads[index].name + '"?')) return;
  leads.splice(index, 1);
  localStorage.setItem("leads", JSON.stringify(leads));
  updateStats();
  applyFilters();
}

function editLead(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "add-lead.html";
}

searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);

updateStats();
renderLeads(leads);