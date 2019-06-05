module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '8000',
    MONGODB_URI: process.env.MONGODB_URI || '',
}