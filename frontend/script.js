const backendUrl = "http://localhost:5000/contacts";

const form = document.getElementById("contactForm");
const contactsList = document.getElementById("contactsList");

function loadContacts() {
    fetch(backendUrl)
        .then(response => response.json())
        .then(data => {
            contactsList.innerHTML = "";
            data.forEach(contact => {
                const li = document.createElement("li");
                li.style.marginBottom = "8px";
                li.style.padding = "8px";
                li.style.border = "1px solid #ddd";
                li.style.borderRadius = "5px";
                li.style.display = "flex";
                li.style.justifyContent = "space-between";
                li.style.alignItems = "center";

                li.innerHTML = `
                    <span><strong>${contact.name}</strong><br>
                    ${contact.email}<br>
                    ${contact.phone}</span>
                `;

                const btn = document.createElement("button");
                btn.textContent = "Supprimer";
                btn.style.background = "#dc3545";
                btn.style.color = "white";
                btn.style.border = "none";
                btn.style.padding = "5px 10px";
                btn.style.borderRadius = "5px";
                btn.style.cursor = "pointer";

                btn.onclick = () => deleteContact(contact.id);

                li.appendChild(btn);
                contactsList.appendChild(li);
            });
        });
}

function addContact(name, email, phone) {
    fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone })
    }).then(() => loadContacts());
}

function deleteContact(id) {
    fetch(`${backendUrl}/${id}`, { method: "DELETE" })
        .then(() => loadContacts());
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    addContact(name, email, phone);
    form.reset();
});

loadContacts();

