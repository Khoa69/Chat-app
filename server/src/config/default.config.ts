import dotenv from 'dotenv';
dotenv.config()

export default {
    port : process.env.PORT || 3001,
    mongo_url : process.env.MONGODB_URL,
    token_secret : process.env.ACCESS_TOKEN_SECRET,
    token_life : process.env.ACCESS_TOKEN_LIFE,
}