const cookieController = {};

cookieController.getTokenCookie = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(200).send(false);
    else res.locals.accessToken = token;
    return next();
};

cookieController.setTokenCookie = (req, res, next) => {
    const { access_token } = res.locals.authData;
    res.cookie('token', access_token, { httpOnly: true, maxAge: 3540000 });
    res.locals.accessToken = access_token;
    return next();
};

cookieController.getSSIDCookie = (req, res, next) => {
    const id = req.cookies.ssid;
    if (!id) return res.status(200).send(false);
    else res.locals.userId = id;
    return next();
};

cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.userId, { httpOnly: true });
    return next();
};

cookieController.deleteSSIDCookie = (req, res, next) => {
    const id = req.cookies.ssid;
    if (id) {
        res.locals.userId = id;
        res.clearCookie('ssid');
    }
    return next();
};

module.exports = cookieController;