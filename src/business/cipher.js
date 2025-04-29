const crypto = require("crypto");

const cipher = {
    hashPassword: (password) => {
        return crypto.createHash("sha256").update(password).digest("base64");
    }
};

module.exports = cipher;