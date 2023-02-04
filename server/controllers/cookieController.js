const cookieController = {};

cookieController.getTokenCookie = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) res.status(200).send(false);
    else res.locals.token = token;
    return next();
};

cookieController.setTokenCookie = (req, res, next) => {
    const { access_token } = res.locals.authData;
    const options = { httpOnly: true, maxAge: 212400 };
    res.cookie('token', access_token, options);
    return next();
};

cookieController.getSSIDCookie = (req, res, next) => {
    const id = req.cookies.ssid;
    if (!user) res.status(200).send(false);
    else res.locals.userId = id;
    return next();
};

cookieController.setSSIDCookie = (req, res, next) => {
    const options = { httpOnly: true };
    res.cookie('ssid', res.locals.userId, options);
    return next();
};

cookieController.deleteSSIDCookie = (req, res, next) => {
    if (req.cookies.ssid) res.clearCookie('ssid');
    return next();
};

module.exports = cookieController;