if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

const tableBody = document.querySelector(".table-body");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let leads = JSON.parse(localStorage.getItem("leads")) || [];

function renderLeads(filteredLeads) {
    tableBody.innerHTML = "";
    if (filteredLeads.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">No leads found</td></tr>`;
        return;
    }
    filteredLeads.forEach((lead, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${lead.name}</td>
            <td>${lead.phone}</td>
            <td>${lead.followUpDate || "-"}</td>
            <td>${lead.status}</td>
            <td>
                <button onclick="editLead(${index})">Edit</button>
                <button onclick="deleteLead(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function applySearchAndFilter() {
    const searchText = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchText) ||
            lead.phone.includes(searchText);

        const matchesStatus =
            statusValue === "all" || lead.status === statusValue;

        return matchesSearch && matchesStatus;
    });

    renderLeads(filteredLeads);
}

function deleteLead(index) {
    if (!confirm("Delete this lead?")) return;
    leads.splice(index, 1);
    localStorage.setItem("leads", JSON.stringify(leads));
    applySearchAndFilter();
}

function editLead(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "add-lead.html";
}

searchInput.addEventListener("input", applySearchAndFilter);
statusFilter.addEventListener("change", applySearchAndFilter);

renderLeads(leads);
