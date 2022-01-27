class Usuario {

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }

    countMascotas() {

        console.log(this.mascotas.length)
       
    }

    addBook(nombreLibro, autorLibro) {
        this.libros.push({ nombre: nombreLibro , autor: autorLibro})
    }

    getBooksNames() {
        
        let librosOutput = []

        for(const libro of this.libros){
            librosOutput.push(libro.nombre)
        }

        console.log(librosOutput)

    }


}


const cristian = new Usuario("cristian", "godoy", [{ nombre: "harry potter" , autor: "Rowling"}], ["perro", "gato"])


cristian.getFullName()
cristian.addMascota("pajaro")
cristian.countMascotas()
cristian.addBook("el jardin secreto", "Frances Hodgson Burnett")
cristian.getBooksNames()
