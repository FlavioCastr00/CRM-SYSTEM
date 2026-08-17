async function LoadContacts(companyID) {
    const response = await fetch(`/companies/${companyID}/contacts`);
    const contacts = await response.json();
    DisplayContacts(contacts, companyID);
}

function DisplayContacts(contacts, companyID) {
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="contacts-header">
            <div>
                <h3>Contacts</h3>
                <span>People associated with this company</span>
            </div>

            <button
                id="add-contact-button"
                onclick="AddContact(${companyID})">
                Add Contact
            </button>
        </div>

        <div class="contacts-list">
            ${
                contacts.length > 0
                ? contacts.map(contact => `
                    <div class="contact-card">
                        <h4>${contact.Name}</h4>
                        <p>${contact.Position}</p>
                        <p>${contact.Email ?? 'N/A'}</p>
                        <p>${contact.Phone ?? 'N/A'}</p>
                        <span>${contact.Status}</span>
                    </div>
                `).join('')
                : `
                    <div class="contacts-empty">
                        <strong>No contacts yet</strong>
                        <span>Add the first contact for this company.</span>
                    </div>
                `
            }
        </div>
    `;
}

function AddContact(companyID) {
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="contact-form-header">
            <div>
                <h3>Add Contact</h3>
                <span>Enter the contact's information</span>
            </div>
        </div>

        <form id="contact-form">

            <div class="form-group full-width">
                <label for="contact-name">
                    Name
                </label>

                <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                >
            </div>

            <div class="form-group">
                <label for="contact-position">
                    Position
                </label>

                <input
                    type="text"
                    id="contact-position"
                    name="position"
                    required
                >
            </div>

            <div class="form-group">
                <label for="contact-email">
                    Email
                </label>

                <input
                    type="email"
                    id="contact-email"
                    name="email"
                >
            </div>

            <div class="form-group">
                <label for="contact-phone">
                    Phone
                </label>

                <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                >
            </div>

            <div class="form-actions">

                <button
                    type="button"
                    onclick="LoadContacts(${companyID})">
                    Cancel
                </button>

                <button type="submit">
                    Add Contact
                </button>

            </div>

        </form>
    `;

    const form = document.getElementById('contact-form');

    form.onsubmit = async function(event) {
        event.preventDefault();

        try {
            const response = await fetch(`/companies/${companyID}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: form.elements['name'].value,
                    position: form.elements['position'].value,
                    email: form.elements['email'].value,
                    phone: form.elements['phone'].value
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to add contact.');
            }

            await LoadContacts(companyID);
            alert('New contact added sucessfully.');
        } catch(error) {
            console.log(error);
            alert(error.message);
        }
    }
}