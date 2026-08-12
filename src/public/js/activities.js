async function LoadActivities(companyID) {
    const response = await fetch(`/companies/${companyID}/activities`);

    if (!response.ok) {
        throw new Error('Failed to load activities.');
    }

    const activities = await response.json();

    DisplayActivities(activities);
}

function DisplayActivities(activities) {
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <h3>Activities</h3>

        <div class="activities-list">

            ${activities.map(activity => `
                <div class="activity-card">

                    <h4>${activity.Type}</h4>

                    <p>
                        <strong>Date:</strong>
                        ${activity.ActivityDate}
                    </p>

                    <p>
                        <strong>Result:</strong>
                        ${activity.Result ?? 'N/A'}
                    </p>

                    <p>
                        <strong>Notes:</strong>
                        ${activity.Notes ?? 'N/A'}
                    </p>

                </div>
            `).join('')}

        </div>
    `;
}