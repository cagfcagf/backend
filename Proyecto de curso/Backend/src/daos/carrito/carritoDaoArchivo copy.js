import ContenedorArchivo from "../../contenedores/contenedorArchivo";
import config from "../../config";



const carroApi = new ContenedorArchivo(`${config.fileSystem.patch}/carro.txt`)


export default carroApi