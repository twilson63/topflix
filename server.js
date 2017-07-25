var historyApiFallback = require('connect-history-api-fallback')

var browserSync = require("browser-sync").create();

browserSync.init({
    files: ["**/*.js"],
    server: {
        baseDir: ".",
        middleware: [ historyApiFallback() ]
    }
})
