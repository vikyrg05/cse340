const flash = (req, res, next) => {
    req.flash = (type, message) => {
        if (!req.session.flash) {
            req.session.flash = {};
        }

        if (!req.session.flash[type]) {
            req.session.flash[type] = [];
        }

        req.session.flash[type].push(message);
    };

    res.locals.flash = () => {
        const messages = req.session.flash || {};
        req.session.flash = {};
        return messages;
    };

    next();
};

export default flash;