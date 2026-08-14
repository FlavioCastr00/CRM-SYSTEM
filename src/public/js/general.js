async function LoadGeneral() {
    const response = await fetch(`/companies/${currentCompanyID}`);
    const company = await response.json();
    DisplayGeneral(company);
}

function DisplayGeneral(company) {
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="general-header">
            <div>
                <h3>General Information</h3>
                <span>Company details</span>
            </div>

            <button
                class="edit-info-button"
                onclick="EnableGeneralEdit(${company.ID})">
                Edit information
            </button>
        </div>

        <div class="general-info-grid">

            <div class="info-field full-width">
                <span class="info-label">Name</span>
                <span class="info-value">${company.Name}</span>
            </div>

            <div class="info-field">
                <span class="info-label">Category</span>
                <span class="info-value">${company.Category ?? 'N/A'}</span>
            </div>

            <div class="info-field">
                <span class="info-label">Status</span>
                <span class="info-value status-value">${company.Status}</span>
            </div>

            <div class="info-field full-width">
                <span class="info-label">Address</span>
                <span class="info-value">${company.Address ?? 'N/A'}</span>
            </div>

            <div class="info-field">
                <span class="info-label">Neighborhood</span>
                <span class="info-value">${company.Neighborhood ?? 'N/A'}</span>
            </div>

            <div class="info-field">
                <span class="info-label">Phone</span>
                <span class="info-value">${company.Phone ?? 'N/A'}</span>
            </div>

            <div class="info-field">
                <span class="info-label">Email</span>
                <span class="info-value">${company.Email ?? 'N/A'}</span>
            </div>

            <div class="info-field">
                <span class="info-label">Website</span>
                <span class="info-value">
                    ${company.Website ? `<a href="${company.Website}" target="_blank">${company.Website}</a>`
                    : 'N/A'}
                </span>
            </div>

            <div class="info-field">
                <span class="info-label">Score</span>
                <span class="info-value">${company.Score}</span>
            </div>

            <div class="info-field">
                <span class="info-label">Priority</span>
                <span class="info-value">${company.Priority}</span>
            </div>

        </div>

        <div class="danger-zone">
            <div>
                <strong>Archive company</strong>
                <span>This action can be undone in the archive tab.</span>
            </div>

            <button
                type="button"
                class="archive-company-button"
                onclick="ArchiveCompany(${company.ID})">
                Archive Company
            </button>
        </div>
    `;
}

async function EnableGeneralEdit(companyID) {
    // Load company
    const companyResponse = await fetch(`/companies/${companyID}`);

    if (!companyResponse.ok) {
        throw new Error('Failed to load company.');
    }

    const company = await companyResponse.json();

    // Load categories
    const categoriesResponse = await fetch('/categories');

    if (!categoriesResponse.ok) {
        throw new Error('Failed to load categories.');
    }

    const categories = await categoriesResponse.json();

    // Display edit form
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="edit-mode-header">
            <div>
                <h3>General</h3>
                <span>Editing company information</span>
            </div>
        </div>

        <form id="general-edit-form">

            <div class="edit-field full-width">
                <label for="name">Name:</label>
                <input type="text" id="name" value="${company.Name}">
            </div>

            <div class="edit-field">
                <label for="category">Category:</label>
                <select id="category">
                    ${categories.map(category => `
                        <option
                            value="${category.ID}"
                            ${category.ID === company.CategoryID ? 'selected' : ''}>
                            ${category.Name}
                        </option>
                    `).join('')}
                </select>
            </div>

            <div class="edit-field">
                <label for="neighborhood">Neighborhood:</label>
                <input type="text" id="neighborhood" value="${company.Neighborhood ?? ''}">
            </div>

            <div class="edit-field full-width">
                <label for="address">Address:</label>
                <input type="text" id="address" value="${company.Address ?? ''}">
            </div>

            <div class="edit-field">
                <label for="email">Email:</label>
                <input type="email" id="email" value="${company.Email ?? ''}">
            </div>

            <div class="edit-field">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" value="${company.Phone ?? ''}">
            </div>

            <div class="edit-field full-width">
                <label for="website">Website:</label>
                <input type="url" id="website" value="${company.Website ?? ''}">
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="LoadGeneral()">
                    Cancel
                </button>
                <button type="submit">
                    Save
                </button>
            </div>
        </form>
    `;

    const form = document.getElementById('general-edit-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const updatedCompany = {
            name: document.getElementById('name').value,
            categoryID: document.getElementById('category').value,
            address: document.getElementById('address').value,
            neighborhood: document.getElementById('neighborhood').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            website: document.getElementById('website').value
        }

        try {
            const response = await fetch(`/companies/${companyID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCompany)
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to update company.');
            }

            await LoadGeneral();
            await LoadCompanies();
        } catch(error) {
            console.error(error);
            alert(error.message);
        }        
    });
}

async function ArchiveCompany(companyID) {
    const confirmed = confirm('Are you sure you want to archive this company? \n\nThis action can be undone in the archive tab.');

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/companies/${companyID}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to delete company.');
        }

        alert('Company deleted sucessfully.');

        // Close modal
        document.getElementById('company-modal').classList.remove('active');

        // Refresh table
        await LoadCompanies();
    } catch(error) {
        console.error(error);
        alert(error.message);
    }
}