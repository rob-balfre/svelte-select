const { rm } = require('fs/promises');
const path = require("path");

(async () => {
    await rm(path.join(__dirname, '/lib/no-styles/'), { recursive: true });
})();
