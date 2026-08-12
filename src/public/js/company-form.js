document.getElementById('add-company-button').addEventListener('click', async () => {
    document.getElementById('add-company-modal').classList.add('active');
    await LoadCategories();
});

document.getElementById('add-company-close').addEventListener('click', () => {
    document.getElementById('add-company-modal').classList.remove('active');
});

async function LoadCategories() {
    const response = await fetch('/categories');

    if (!response.ok) {
        throw new Error('Failed to load categories.');
    }

    const categories = await response.json();

    const categorySelect = document.getElementById('category');

    categorySelect.innerHTML = `
        <option value="">Select a category</option>

        ${categories.map(category => `
            <option value="${category.ID}">
                ${category.Name}
            </option>
        `).join('')}
    `;
}

document.getElementById('company-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;

    const company = {
        name: form.elements['name'].value,
        categoryID: form.elements['categoryID'].value,
        website: form.elements['website'].value,
        email: form.elements['email'].value,
        phone: form.elements['phone'].value,
        address: form.elements['address'].value,
        neighborhood: form.elements['neighborhood'].value
    };

    const response = await fetch('/companies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(company)
    });

    const result = await response.json();

    console.log(result);

    if (response.ok) {
        form.reset();

        LoadCompanies();

        alert('The Company was added successfully.');

        document.getElementById('add-company-modal').classList.remove('active');
    }
});