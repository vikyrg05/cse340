CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT project_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

INSERT INTO project (organization_id, title, description, location, date)
VALUES
(1, 'Community School Renovation', 'Renovate classrooms and improve the school environment.', 'Cochabamba', '2026-09-20'),
(1, 'Neighborhood Cleanup', 'Clean public areas and collect recyclable materials.', 'Cochabamba', '2026-09-27'),
(1, 'Home Repair Assistance', 'Help families with basic home repairs.', 'Quillacollo', '2026-10-04'),
(1, 'Community Garden Project', 'Build and prepare a garden for the local community.', 'Cochabamba', '2026-10-11'),
(1, 'Youth Building Workshop', 'Teach young people basic construction and safety skills.', 'Cochabamba', '2026-10-18'),
(2, 'Community Vegetable Garden', 'Plant vegetables and maintain a shared community garden.', 'Cochabamba', '2026-09-21'),
(2, 'Tree Planting Day', 'Plant trees in a local community area.', 'Cochabamba', '2026-09-28'),
(2, 'Organic Farming Workshop', 'Teach families basic organic farming practices.', 'Sacaba', '2026-10-05'),
(2, 'Harvest Support Project', 'Help local growers harvest seasonal crops.', 'Sacaba', '2026-10-12'),
(2, 'School Garden Program', 'Create a small educational garden at a local school.', 'Cochabamba', '2026-10-19'),
(3, 'Food Donation Drive', 'Collect and distribute food to families in need.', 'Cochabamba', '2026-09-22'),
(3, 'Senior Center Visit', 'Spend time with seniors and provide volunteer assistance.', 'Cochabamba', '2026-09-29'),
(3, 'Children Reading Program', 'Read books and organize educational activities for children.', 'Cochabamba', '2026-10-06'),
(3, 'Clothing Donation Event', 'Collect and distribute clothing to people in need.', 'Cochabamba', '2026-10-13'),
(3, 'Community Service Day', 'Organize volunteers to support local community needs.', 'Cochabamba', '2026-10-20');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO category (name)
VALUES
('Community Service'),
('Environment'),
('Education');

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT project_category_project_fk
        FOREIGN KEY (project_id)
        REFERENCES project(project_id),
    CONSTRAINT project_category_category_fk
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);

INSERT INTO project_category (project_id, category_id)
VALUES
(1, 3),
(2, 2),
(3, 1),
(4, 2),
(5, 3),
(6, 2),
(7, 2),
(8, 3),
(9, 1),
(10, 3),
(11, 1),
(12, 1),
(13, 3),
(14, 1),
(15, 1);

