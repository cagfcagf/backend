import ContenedorArchivo from "../../contenedores/contenedorMongoCarrito";
import config from "../../config";



const carroApi = new ContenedorArchivo(config.mongoLocal, 'carrito')


export default carroApi