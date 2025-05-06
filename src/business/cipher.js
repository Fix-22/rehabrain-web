const crypto = require("crypto");

const generateCipher = () => {
    return {
        generatePassword: (length) => {
            const set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?!_-+#%$&";
            let password = "";
            
            for (let i = 0; i < length; i++) {
                password += set.charAt(Math.floor(Math.random() * set.length));
            }

            return password;
        },
        hashPassword: (password) => {
            return crypto.createHash("sha256").update(password).digest("base64");
        }
    }
};

module.exports = generateCipher;