const { parse } = require('url');
const { getScreenshot } = require('./chromium');
const { getUrlFromPath, isValidUrl } = require('./validator');

module.exports = async function (req, res) {
    try {
        const { pathname = '/' } = parse(req.url, true);
        const url = getUrlFromPath(pathname);
        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
        } else {
            const file = await getScreenshot(url);
            res.statusCode = 200;
            res.setHeader('Content-Type', `image/png`);
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
};
