const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:4000",
            changeOrigin: true,
        }),
    );
    app.use(
        createProxyMiddleware("/users", {
            target: "http://localhost:4000",
            changeOrigin: true,
        }),
    );
    app.use(
        createProxyMiddleware("/setboard", {
            target: "http://localhost:4000",
            changeOrigin: true,
        }),
    );
};
