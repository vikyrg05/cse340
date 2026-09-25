// Import any needed model functions
import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';

import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showNewCategoryForm = (req, res) => {
    const title = 'Create New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    const categoryId = await createCategory(name);

    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    if (!category) {
        const error = new Error('Category Not Found');
        error.status = 404;
        throw error;
    }

    const title = 'Edit Category';

    res.render('edit-category', { title, category });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);
};

const showCategoryDetail = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
        const error = new Error('Category Not Found');
        error.status = 404;
        throw error;
    }

    const projects = await getProjectsByCategoryId(categoryId);
    const title = category.name;

    res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const project = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        project,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const categoryIds = req.body.categoryIds;

    await updateCategoryAssignments(projectId, categoryIds);

    req.flash('success', 'Project categories updated successfully!');
    res.redirect(`/project/${projectId}`);
};

// Export any controller functions
export {
    showCategoriesPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    showCategoryDetail,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    categoryValidation
};