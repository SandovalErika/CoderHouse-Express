const fs = require('fs');

//SERVIDOR CON EXPRESS

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

app.get('/productos', (req, res) => {
    res.send(Contenedor.lista);
});

app.get('/productosRandom', (req, res) => {
    res.send(Contenedor.lista[Math.floor(Math.random() * Contenedor.lista.length)]);
});

//CLASE CONTENEDOR

class Contenedor{

     constructor() {
        console.log("Inicializando contenedor");
        
    }

    static countID = 0;
    static file = "productos.txt"
    static lista = []                      

    async save (objeto) {
        Contenedor.countID++;
        objeto['id'] = Contenedor.countID;

        Contenedor.lista.push(objeto);

        await this.write();

        return Contenedor.countID;
    }

    async write(){

        await fs.promises.writeFile(Contenedor.file, JSON.stringify(Contenedor.lista));
    }

    async read(){
        let data = await fs.promises.readFile(Contenedor.file);
        Contenedor.lista = JSON.parse(data);
    }

}

let cc = new Contenedor();
cc.save({nombre: "Pizza", precio: "10"});
cc.save({nombre: "Hamburguesa", precio: "20"});
cc.save({nombre: "Pollo", precio: "30"});

