import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    showEditOrganizationForm,
    processNewOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetail,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Route for organization details page

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/new-organization', showNewOrganizationForm);

router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

router.get('/projects', showProjectsPage);

router.get('/new-project', showNewProjectForm);

router.post('/new-project', projectValidation, processNewProjectForm);

router.get('/categories', showCategoriesPage);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);

router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);

router.get('/category/:id', showCategoryDetail);

// error-handling routes

router.get('/test-error', testErrorPage);

export default router;