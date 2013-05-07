//----------------------------------------------------------------------------------------------------------------------
// Handles returning a nice, pretty 404 error.
//
// @module 404_handler.js
//----------------------------------------------------------------------------------------------------------------------

var app = require('../omega').app;
var logger = require('./logging').getLogger('404');

//----------------------------------------------------------------------------------------------------------------------

function handle404(request, response)
{
    logger.warn('Unable to find handler for: \"%s\"', request.url);

    //TODO: Make this uber sexy, with nice output, and anything else that might be useful.
    response.writeHead(404,
    {
        "Content-Type": "text/html"
    });

    response.end(
        "<html><body>"
        + "<h1>404 Not Found</h1>"
        + "<p>Unable to find handler for: \""
        + request.url
        + "\"</p>"
        + "</body></html>"
    );
} // end handle404

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    handle404: handle404
}; // end exports

//----------------------------------------------------------------------------------------------------------------------