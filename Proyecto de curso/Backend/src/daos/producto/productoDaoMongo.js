import ContenedorArchivo from "../../contenedores/contenedorMongo";
import config from "../../config";



const productosApi = new ContenedorArchivo(config.mongoLocal, 'productos')


export default productosApi