const PROXY_CONFIG = {
    "/api/*": {
        target: "http://127.0.0.1:8081",
        secure: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-type, Authorization',
        },
        pathRewrite: { "^/api": "" }
    },
};

module.exports = PROXY_CONFIG;