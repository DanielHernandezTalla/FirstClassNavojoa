'use strict';

const statusMessage = {
    '200': 'OK',
    '201': 'Created',
    '400': 'Bad Request',
    '404': 'Not found',
    '500': 'Internal Server Error'
}

// -- Respondiendo de manera general para todas las peticiones
exports.success = (req, res, body = null, status = 200) => {
    if (!body)
        body = statusMessage[status];

    // console.log(body)
    res.status(status).send({
        'error': null,
        'body': body
    });
}

exports.error = (req, res, body = null, status = 500, details = null) => {
    console.error("[Response Error] " + details)
    if (!body)
        body = statusMessage[status];

    res.status(status).send({
        'error': {
            'body': body,
            'details': details
        },
        'body': null,
    });
}
