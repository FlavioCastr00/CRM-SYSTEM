async function OpenCompanyModal(companyID) {
    currentCompanyID = companyID;
    currentSection = 'general';

    try {
        const response = await fetch(`/companies/${currentCompanyID}`);

        if (!response.ok) {
            throw new Error('Failed to load company');
        }

        const company = await response.json();

        const modal = document.getElementById('company-modal');
        const companyName = document.getElementById('modal-company-name');

        companyName.textContent = company.Name;
        modal.classList.add('active');

        DisplayGeneral(company);
    } catch (error) {
        console.error(error);
        alert('Unable to load company information.');
    }
}

function ChangeModalSection(section) {
    currentSection = section;

    document.querySelectorAll('.modal-tab').forEach(button => {
        button.classList.remove('active');
    });

    document.querySelector(`.modal-tab[data-section="${section}"]`).classList.add('active');

    if (section === 'general') {
        LoadGeneral();
    }

    else if (section === 'contacts') {
        LoadContacts(currentCompanyID);
    }

    else if (section === 'activities') {
        LoadActivities(currentCompanyID);
    }
}

async function LoadGeneral() {
    const response = await fetch(`/companies/${currentCompanyID}`);
    const company = await response.json();
    DisplayGeneral(company);
}

function DisplayGeneral(company) {
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h3>General</h3>

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