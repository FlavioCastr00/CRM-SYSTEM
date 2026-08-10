let currentCompanyID = null;
let currentSection = 'general';

LoadCompanies();

document
    .getElementById('company-filter-form')
    .addEventListener('submit', function(event) {
        event.preventDefault();
        LoadCompanies();
    }
);

document
    .getElementById('modal-close')
    .addEventListener('click', function() {
        document.getElementById('company-modal').classList.remove('active');

        document.querySelectorAll('.modal-tab').forEach(button => {
            button.classList.remove('active');
        });

        document.querySelector('.modal-tab[data-section="general"]').classList.add('active');
    }
);