async function LoadContacts(companyID) {
    const response = await fetch(`/companies/${companyID}/contacts`);
    const contacts = await response.json();
    DisplayContacts(contacts);
}

function DisplayContacts(contacts) {
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h3>Contacts</h3>
        <div class="contacts-list">
            ${contacts.map(contact => `
                <div class="contact-card">
                    <h4>${contact.Name}</h4>
                    <p>${contact.Position}</p>
                    <p>${contact.Email ?? 'N/A'}</p>
                    <p>${contact.Phone ?? 'N/A'}</p>
                    <span>${contact.Status}</span>
                </div>
            `).join('')}
        </div>
    `;
}