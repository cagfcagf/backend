export default {
    PORT: 8080 || process.env.PORT,
    fileSystem: {
        patch: "./DB"
        
    },
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/ecommerce'
    }

}