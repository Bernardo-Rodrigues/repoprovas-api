import "dotenv/config";

export default {
    port: process.env.PORT || 4000,
    secretKey: process.env.SECRET_KEY
};  