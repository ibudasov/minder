exports.handle = function (err, res, status) {
    if (err) {
        console.log(err.message);
        console.trace();
        if (res) {
            res.send(err, status || 500);
        }
        return true;
    }
    return false;
};

exports.getHandler = function (msg, res, status) {
    return function (err) {
        if (err) {
            console.log(msg, err.message);
            console.trace();
            if (res) {
                res.send(msg + " | " + err, status || 500);
            }
        }
    }
};
