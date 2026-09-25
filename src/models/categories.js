import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT category.category_id, category.name
        FROM public.category
        JOIN public.project_category
            ON category.category_id = project_category.category_id
        WHERE project_category.project_id = $1;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO public.project_category (project_id, category_id)
        VALUES ($1, $2);
    `;

    const queryParams = [projectId, categoryId];
    await db.query(query, queryParams);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM public.project_category
        WHERE project_id = $1;
    `;

    const deleteParams = [projectId];
    await db.query(deleteQuery, deleteParams);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            project.project_id,
            project.title,
            project.description,
            project.location,
            project.date
        FROM public.project
        JOIN public.project_category
            ON project.project_id = project_category.project_id
        WHERE project_category.category_id = $1
        ORDER BY project.date;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO public.category (name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const queryParams = [name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

const updateCategory = async (id, name) => {
    const query = `
        UPDATE public.category
        SET name = $1
        WHERE category_id = $2;
    `;

    const queryParams = [name, id];
    await db.query(query, queryParams);
};

export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
}