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