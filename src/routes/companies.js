const express = require('express');
const db = require('../database')

const router = express.Router();

router.get('/', (req, res) => {
    try {
        let query = `
            SELECT
                Companies.ID,
                Companies.Name,
                Categories.Name AS Category,
                Companies.Neighborhood,
                Companies.Address,
                Companies.Email,
                Companies.Phone,
                Companies.Website,
                Companies.LastContact,
                Companies.Source,
                Companies.Score,
                Companies.Priority,
                Companies.CreatedAt,
                Companies.Status
            FROM Companies
            LEFT JOIN Categories
                ON Companies.CategoryID = Categories.ID
            WHERE 1 = 1
        `;

        const params = {};

        if (req.query.name) {
            query += ` AND Companies.Name LIKE @name`;
            params.name = `%${req.query.name}%`;
        }

        if (req.query.status) {
            query += ` AND Companies.Status = @status`;
            params.status = req.query.status;
        }

        const companies = db.prepare(query).all(params);

        res.json(companies);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.get('/:id', (req, res) => {
    try {
        const company = db.prepare(`
            SELECT
                Companies.ID,
                Companies.Name,
                Categories.Name AS Category,
                Companies.Neighborhood,
                Companies.Address,
                Companies.Email,
                Companies.Phone,
                Companies.Website,
                Companies.LastContact,
                Companies.Source,
                Companies.Score,
                Companies.Priority,
                Companies.CreatedAt,
                Companies.Status,
                Companies.UpdatedAt,
                Companies.Notes

            FROM Companies
            LEFT JOIN Categories
                ON Companies.CategoryID = Categories.ID
            WHERE Companies.ID = ?
        `).get(req.params.id);

        if (!company) {
            return res.status(404).json({
                error: 'Company not found'
            });
        }

        res.json(company);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.get('/:id/contacts', (req, res) => {
    try {
        const contacts = db.prepare(`
            SELECT *
            FROM Contacts
            WHERE CompanyID = ?
            ORDER BY Name  
        `).all(req.params.id);

        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;