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
    res.json({
        message: `Returning company with id ${req.params.id}`
    });
});

module.exports = router;