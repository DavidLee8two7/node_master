exports.myMiddleware = (req, res, next) => {
    req.name = 'David';
    res.cookie('name', 'David is cool', { maxAge: 9000000 });
    next();
}

exports.homePage = (req, res) => {
    console.log(req.name)
    res.render('index');
}