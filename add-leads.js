const form = document.getElementById("add-lead-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name=document.getElementById("lead-name").value;
    const phone=document.getElementById("lead-no").value;
    const requirement=document.getElementById("lead-req").value;
    const followUpDate=document.getElementById("followup-date").value;
    const status=document.getElementById("status-selection").value;
    if (name===""||phone==="") {
        alert("Name and Phone are required");
        return;
    }
    const lead = {
        name: name,
        phone: phone,
        requirement: requirement,
        followUpDate: followUpDate,
        status: status
    };
    let leads = JSON.parse(localStorage.getItem("leads")) || [];
    leads.push(lead);
    localStorage.setItem("leads", JSON.stringify(leads));

    window.location.href = "leads.html";
});
