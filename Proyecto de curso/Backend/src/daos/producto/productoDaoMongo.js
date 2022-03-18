import ContenedorArchivo from "../../contenedores/contenedorMongoProductos";
import config from "../../config";



const productosApi = new ContenedorArchivo(config.mongoLocal, 'productos')


export default productosApi