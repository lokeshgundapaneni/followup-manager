if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

document.getElementById("logout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

const form = document.getElementById("add-lead-form");
const editIndex = localStorage.getItem("editIndex");
const isEditing = editIndex !== null;

const pills = document.querySelectorAll(".pill");
const statusHidden = document.getElementById("status-hidden");

pills.forEach(function (pill) {
  pill.addEventListener("click", function () {
    pills.forEach(function (p) { p.classList.remove("active"); });
    pill.classList.add("active");
    statusHidden.value = pill.dataset.value;
  });
});

if (isEditing) {
  document.getElementById("form-title").textContent = "Edit Lead";
  document.getElementById("save-btn").textContent = "Update Lead";
  document.getElementById("edit-notice").classList.add("show");

  const leads = JSON.parse(localStorage.getItem("leads")) || [];
  const lead = leads[editIndex];

  if (lead) {
    document.getElementById("lead-name").value = lead.name || "";
    document.getElementById("lead-no").value = lead.phone || "";
    document.getElementById("lead-email").value = lead.email || "";
    document.getElementById("lead-req").value = lead.requirement || "";
    document.getElementById("followup-date").value = lead.followUpDate || "";
    statusHidden.value = lead.status || "New";

    pills.forEach(function (p) {
      p.classList.remove("active");
      if (p.dataset.value === lead.status) {
        p.classList.add("active");
      }
    });
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("lead-name").value.trim();
  const phone = document.getElementById("lead-no").value.trim();
  const email = document.getElementById("lead-email").value.trim();
  const requirement = document.getElementById("lead-req").value.trim();
  const followUpDate = document.getElementById("followup-date").value;
  const status = statusHidden.value;

  if (!name || !phone) {
    alert("Name and Phone are required.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  const lead = {
    name: name,
    phone: phone,
    email: email,
    requirement: requirement,
    followUpDate: followUpDate,
    status: status
  };

  let leads = JSON.parse(localStorage.getItem("leads")) || [];

  if (isEditing) {
    leads[editIndex] = lead;
    localStorage.removeItem("editIndex");
  } else {
    leads.push(lead);
  }

  localStorage.setItem("leads", JSON.stringify(leads));
  window.location.href = "leads.html";
});