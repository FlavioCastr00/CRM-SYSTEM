async function LoadCompanies() {
    const form = document.getElementById('company-filter-form');

    const companyName = form.elements['company-name'].value;
    const status = form.elements['status'].value;

    const params = new URLSearchParams();

    if (companyName) {
        params.append('name', companyName);
    }

    if (status !== 'ALL') {
        params.append('status', status);
    }

    const response = await fetch(`/companies?${params.toString()}`);
    const companies = await response.json();
    FillCompaniesTableWithData(companies);
}

function FillCompaniesTableWithData(data) {
    const tableDiv = document.getElementById('table-div');

    tableDiv.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>CATEGORY</th>
                    <th>NEIGHBORHOOD</th>
                    <th>ADDRESS</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>WEBSITE</th>
                    <th>LAST CONTACT</th>
                    <th>SOURCE</th>
                    <th>SCORE</th>
                    <th>PRIORITY</th>
                    <th>CREATED AT</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(company => `
                    <tr onclick="OpenCompanyModal(${company.ID})">
                        <td>${company.ID}</td>
                        <td>${company.Name}</td>
                        <td>${company.Category ?? 'N/A'}</td>
                        <td>${company.Neighborhood}</td>
                        <td>${company.Address}</td>
                        <td>${company.Email ?? 'N/A'}</td>
                        <td>${company.Phone ?? 'N/A'}</td>
                        <td>${company.Website ?? 'N/A'}</td>
                        <td>${company.LastContact ?? 'N/A'}</td>
                        <td>${company.Source ?? 'N/A'}</td>
                        <td>${company.Score}</td>
                        <td>${company.Priority}</td>
                        <td>${company.CreatedAt}</td>
                        <td>${company.Status}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}