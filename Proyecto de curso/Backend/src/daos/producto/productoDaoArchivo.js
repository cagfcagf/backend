import ContenedorArchivo from "../../contenedores/contenedorArchivo";
import config from "../../config";



const productosApi = new ContenedorArchivo(`${config.fileSystem.patch}/productos.txt`)


export default productosApi