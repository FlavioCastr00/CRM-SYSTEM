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

router.post('/', (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                error: "Category name is required"
            });
        }

        const categoryName = name.trim();

        const result = db.prepare(`
            INSERT INTO Categories (Name)
            VALUES (?)
        `).run(categoryName);

        res.status(201).json({
            ID: result.lastInsertRowid,
            Name: categoryName
        });
    } catch(error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({
                error: 'A category with this name already exists'
            });
        }

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;