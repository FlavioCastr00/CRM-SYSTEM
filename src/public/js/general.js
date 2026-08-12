async function LoadGeneral() {
    const response = await fetch(`/companies/${currentCompanyID}`);
    const company = await response.json();
    DisplayGeneral(company);
}

function DisplayGeneral(company) {
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h3>General</h3>

        <button onclick="EnableGeneralEdit(${company.ID})">
            Edit information
        </button>

        <p><strong>Name:</strong> ${company.Name}</p>
        <p><strong>Category:</strong> ${company.Category ?? 'N/A'}</p>
        <p><strong>Address:</strong> ${company.Address}</p>
        <p><strong>Neighborhood:</strong> ${company.Neighborhood}</p>
        <p><strong>Email:</strong> ${company.Email ?? 'N/A'}</p>
        <p><strong>Phone:</strong> ${company.Phone ?? 'N/A'}</p>
        <p><strong>Website:</strong> ${company.Website ?? 'N/A'}</p>
        <p><strong>Status:</strong> ${company.Status}</p>
        <p><strong>Score:</strong> ${company.Score}</p>
        <p><strong>Priority:</strong> ${company.Priority}</p>
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