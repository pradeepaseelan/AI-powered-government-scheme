-- ============================================================
-- AI Powered Government Scheme Eligibility Portal
-- Database: government_scheme_portal (MySQL 8+)
-- ============================================================

CREATE DATABASE IF NOT EXISTS government_scheme_portal
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE government_scheme_portal;

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
CREATE TABLE users (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name           VARCHAR(150) NOT NULL,
    email               VARCHAR(150) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    phone               VARCHAR(20),
    date_of_birth       DATE,
    gender              ENUM('MALE','FEMALE','OTHER'),
    annual_income       DECIMAL(12,2),
    state               VARCHAR(100),
    district            VARCHAR(100),
    occupation          VARCHAR(100),
    category            ENUM('GENERAL','OBC','SC','ST','EWS'),
    is_disabled         BOOLEAN DEFAULT FALSE,
    is_student          BOOLEAN DEFAULT FALSE,
    is_farmer           BOOLEAN DEFAULT FALSE,
    is_widow            BOOLEAN DEFAULT FALSE,
    is_senior_citizen   BOOLEAN DEFAULT FALSE,
    profile_image       VARCHAR(255),
    role                ENUM('USER') DEFAULT 'USER',
    enabled             BOOLEAN DEFAULT TRUE,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- ADMINS
-- ------------------------------------------------------------
CREATE TABLE admins (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(150) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('ADMIN','SUPER_ADMIN') DEFAULT 'ADMIN',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- SCHEMES
-- ------------------------------------------------------------
CREATE TABLE schemes (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(200) NOT NULL,
    description         TEXT,
    department          VARCHAR(150),
    benefits            TEXT,
    documents_required  TEXT,
    min_age             INT,
    max_age             INT,
    max_income          DECIMAL(12,2),
    applicable_gender   ENUM('MALE','FEMALE','ANY') DEFAULT 'ANY',
    applicable_category VARCHAR(100) DEFAULT 'ALL',
    applicable_state    VARCHAR(100) DEFAULT 'ALL',
    for_student         BOOLEAN DEFAULT FALSE,
    for_farmer          BOOLEAN DEFAULT FALSE,
    for_widow           BOOLEAN DEFAULT FALSE,
    for_senior_citizen  BOOLEAN DEFAULT FALSE,
    for_disabled        BOOLEAN DEFAULT FALSE,
    official_link       VARCHAR(255),
    active              BOOLEAN DEFAULT TRUE,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- APPLICATIONS
-- ------------------------------------------------------------
CREATE TABLE applications (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id       BIGINT NOT NULL,
    scheme_id     BIGINT NOT NULL,
    status        ENUM('PENDING','UNDER_REVIEW','APPROVED','REJECTED') DEFAULT 'PENDING',
    remarks       TEXT,
    applied_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- DOCUMENTS
-- ------------------------------------------------------------
CREATE TABLE documents (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    application_id  BIGINT,
    document_type   VARCHAR(100),
    file_name       VARCHAR(255),
    file_path       VARCHAR(255),
    uploaded_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- ELIGIBILITY RESULTS
-- ------------------------------------------------------------
CREATE TABLE eligibility_results (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    scheme_id       BIGINT NOT NULL,
    is_eligible     BOOLEAN,
    score           DECIMAL(5,2),
    reason          TEXT,
    checked_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- NOTIFICATIONS
-- ------------------------------------------------------------
CREATE TABLE notifications (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    title       VARCHAR(200),
    message     TEXT,
    is_read     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- CHAT HISTORY
-- ------------------------------------------------------------
CREATE TABLE chat_history (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT,
    session_id  VARCHAR(100),
    message     TEXT,
    response    TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- SEED DATA
-- ------------------------------------------------------------
INSERT INTO admins (full_name, email, password, role) VALUES
('Super Admin', 'admin@schemeportal.gov.in', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5R2hRzZOOFOMzDdMKA6E3wKQhLK4S', 'SUPER_ADMIN');
-- default password (bcrypt-encoded above) = "Admin@123" -- change immediately after first login

INSERT INTO schemes (name, description, department, benefits, documents_required, min_age, max_age, max_income, applicable_gender, applicable_category, applicable_state, for_student, for_farmer, for_widow, for_senior_citizen, for_disabled, official_link) VALUES
('PM Kisan Samman Nidhi', 'Income support scheme for farmer families.', 'Ministry of Agriculture', 'Rs 6000/year in three installments', 'Aadhaar Card, Land Records, Bank Passbook', 18, 100, 999999999, 'ANY', 'ALL', 'ALL', FALSE, TRUE, FALSE, FALSE, FALSE, 'https://pmkisan.gov.in'),
('National Scholarship for Students', 'Financial assistance for meritorious students from economically weaker sections.', 'Ministry of Education', 'Scholarship amount up to Rs 12000/year', 'Aadhaar Card, Income Certificate, Marksheet', 15, 30, 250000, 'ANY', 'ALL', 'ALL', TRUE, FALSE, FALSE, FALSE, FALSE, 'https://scholarships.gov.in'),
('Widow Pension Scheme', 'Monthly pension support for widows.', 'Ministry of Social Justice', 'Rs 1000-2000/month', 'Aadhaar Card, Death Certificate of spouse, Income Certificate', 18, 100, 200000, 'FEMALE', 'ALL', 'ALL', FALSE, FALSE, TRUE, FALSE, FALSE, 'https://socialjustice.gov.in'),
('Senior Citizen Pension Scheme', 'Monthly pension for senior citizens without regular income.', 'Ministry of Social Justice', 'Rs 1000-3000/month', 'Aadhaar Card, Age Proof, Income Certificate', 60, 120, 200000, 'ANY', 'ALL', 'ALL', FALSE, FALSE, FALSE, TRUE, FALSE, 'https://socialjustice.gov.in'),
('Disability Support Scheme', 'Financial assistance for persons with disabilities.', 'Ministry of Social Justice', 'Rs 1500/month + assistive devices', 'Aadhaar Card, Disability Certificate', 5, 100, 300000, 'ANY', 'ALL', 'ALL', FALSE, FALSE, FALSE, FALSE, TRUE, 'https://socialjustice.gov.in');
