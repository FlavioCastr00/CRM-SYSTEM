const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const categories = db.prepare(`
            SELECT ID, Name
            FROM Categories
            ORDER BY Name
        `).all();

        res.json(categories);
    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;