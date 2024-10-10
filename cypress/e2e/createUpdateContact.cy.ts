interface ContactProperties {
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    company?: string;
    website?: string;
    lifecyclestage?: string;
}

describe('HubSpot Contacts API Tests', () => {
    let contactId: string;
    const token = Cypress.env('HUBSPOT_ACCESS_TOKEN');

    if (!token) {
        throw new Error('HUBSPOT_ACCESS_TOKEN is not defined, please check .env file');
    }

    it('Create a new contact in HubSpot', () => {
        const uniqueEmail = `sometestuser-${Date.now()}@qwe.com`;

        const newContact: ContactProperties = {
            email: uniqueEmail,
            firstname: 'Mister',
            lastname: 'Twister',
            phone: '(555) 555-11111',
            company: 'HubSpot',
            website: 'hubspot.com',
            lifecyclestage: 'marketingqualifiedlead'
        };

        cy.request({
            method: 'POST',
            url: `/crm/v3/objects/contacts`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: {
                properties: newContact,
            },
        }).then((response) => {
            expect(response.status).to.eq(201); ////contact created
            contactId = response.body.id; ////contact ID will be used in the next test
            expect(contactId).to.exist;
            expect(response.body.properties.email).to.eq(newContact.email);
        });
    });

    it('Update the existing contact in HubSpot', () => {
        if (!contactId) {
            throw new Error('Contact ID is not available, check create contact test');
        }

        const updatedContact: Partial<ContactProperties> = {
            firstname: 'UpdatedMister',
            lastname: 'UpdatedTwister'
        };

        cy.request({
            method: 'PATCH',
            url: `/crm/v3/objects/contacts/${contactId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: {
                properties: updatedContact,
            },
        }).then((response) => {
            expect(response.status).to.eq(200); //// successful update
            expect(response.body.properties.firstname).to.eq(updatedContact.firstname);
            expect(response.body.properties.lastname).to.eq(updatedContact.lastname);
        });
    });
});