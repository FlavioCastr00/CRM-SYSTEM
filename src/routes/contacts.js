const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/companies/:companyID/contacts', (req, res) => {
    try {
        const contacts = db.prepare(`
            SELECT *
            FROM Contacts
            WHERE CompanyID = ?
            ORDER BY Name  
        `).all(req.params.companyID);

        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post('/companies/:companyID/contacts', (req, res) => {
    try {
        const { name, position, email, phone } = req.body;

        const result = db.prepare(`
            INSERT INTO Contacts
            (CompanyID, Name, Position, Email, Phone)
            VALUES (?, ?, ?, ?, ?)
        `).run(req.params.companyID, name, position, email || null, phone || null);

        res.status(201).json({
            ID: result.lastInsertRowid
        });
    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;