const fs = require('fs');
const path = require('path');

const db = require('../src/database');

db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(
    path.join(__dirname, 'schema.sql'),
    'utf8'
);

db.exec(schema);

console.log("Database initialized successfully!");