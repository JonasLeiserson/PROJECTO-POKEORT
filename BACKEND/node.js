const fs = require('fs');
const path = require('path');


const order = [71, 1, 2, 116, 3, 84, 4, 5, 81, 74, 6, 7, 8, 93, 68, 9, 104, 10, 65, 11, 136];


const directoryPath = path.join(__dirname, 'c:(/Users/49516747/Downloads/Tp RAYUELA'); // Cambia 'parrafos' al nombre de tu directorio

// Función para leer y ordenar los párrafos
async function rebuildStory() {
    try {
        // Leer los nombres de los archivos en el directorio
        const files = await fs.promises.readdir(directoryPath);

        // Crear un mapa para almacenar el contenido de cada párrafo
        const paragraphs = {};

        // Leer cada archivo y almacenarlo en el mapa
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const fileContent = await fs.promises.readFile(filePath, 'utf8');
            const fileName = path.basename(file, path.extname(file));
            paragraphs[parseInt(fileName, 10)] = fileContent;
        }

        // Ordenar los párrafos según el orden dado
        let story = '';
        for (const paragraphNumber of order) {
            if (paragraphs[paragraphNumber]) {
                story += paragraphs[paragraphNumber] + '\n';
            } else {
                console.warn(`Falta el párrafo ${paragraphNumber}`);
            }
        }

        // Escribir el cuento reconstruido en un nuevo archivo
        const outputPath = path.join(__dirname, 'La autopista del sur.txt');
        await fs.promises.writeFile(outputPath, story, 'utf8');
        console.log('El cuento ha sido reconstruido y guardado en "La autopista del sur.txt"');

    } catch (error) {
        console.error('Error al reconstruir el cuento:', error);
    }
}

// Ejecutar la función
rebuildStory();
