CREATE TABLE IF NOT EXISTS DiscoveryJobs (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Type TEXT NOT NULL,
  Parameters TEXT NOT NULL,
  Location TEXT NOT NULL,
  Status TEXT DEFAULT "NEW",
  ResultsFound INTEGER NULL,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  Notes TEXT NULL
);

CREATE TABLE Categories (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Companies (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  DiscoveryJobID INTEGER NULL,
  CategoryID INTEGER,  
  Name TEXT NOT NULL,
  Website TEXT NULL,
  Email TEXT NULL,
  Phone TEXT NULL,
  Address TEXT NOT NULL,
  Neighborhood TEXT NOT NULL,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL,
  Status TEXT DEFAULT "NEW",
  GoogleRating REAL NULL,
  Source TEXT NULL,
  LastContact DATETIME NULL,
  Score INTEGER DEFAULT 0,
  Priority INTEGER DEFAULT 0,
  Notes TEXT NULL,
  FOREIGN KEY (DiscoveryJobID) REFERENCES DiscoveryJobs(ID) ON DELETE SET NULL,
  FOREIGN KEY (CategoryID) REFERENCES Categories(ID) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Contacts (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  CompanyID INTEGER NOT NULL,
  Name TEXT NOT NULL,
  Position TEXT NOT NULL,
  Email TEXT NULL,
  Phone TEXT NULL,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL,
  Status TEXT DEFAULT "NEW",
  Notes TEXT NULL,
  FOREIGN KEY (CompanyID) REFERENCES Companies(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Activities (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  CompanyID INTEGER NOT NULL,
  ContactID INTEGER NULL,
  ActivityDate DATETIME NOT NULL,
  Type  TEXT NOT NULL,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  Notes TEXT NULL,
  Result TEXT NULL,
  FOREIGN KEY (CompanyID) REFERENCES Companies(ID) ON DELETE CASCADE,
  FOREIGN KEY (ContactID) REFERENCES Contacts(ID)
);

CREATE INDEX idx_company_discoveryjob
ON Companies(DiscoveryJobID);

CREATE INDEX idx_company_neighborhood
ON Companies(Neighborhood);

CREATE INDEX idx_company_category
ON Companies(CategoryID);

CREATE INDEX idx_company_category_neighborhood
ON Companies(CategoryID, Neighborhood);

CREATE INDEX idx_company_status
ON Companies(Status);

CREATE INDEX idx_company_score
ON Companies(Score);

CREATE INDEX idx_company_priority
ON Companies(Priority);

CREATE INDEX idx_contact_company
ON Contacts(CompanyID);

CREATE INDEX idx_activity_company
ON Activities(CompanyID);

CREATE INDEX idx_activity_contact
ON Activities(ContactID);