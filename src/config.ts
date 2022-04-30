import "dotenv/config";

export default {
    port: process.env.PORT || 4000,
    secretCryptr: process.env.SECRET_CRYPTR,
    secretJWT: process.env.SECRET_JWT,
    environment: process.env.NODE_ENV,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
};  