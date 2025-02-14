require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const express = require('express');
const app = express();

const PORT = 3000;
const sql = neon(process.env.DATABASE_URL);

app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM tbl_tareas`;

        let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Tareas</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                .container {
                    width: 80%;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: white;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                h1 {
                    text-align: center;
                    color: #4CAF50;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                }
                tr:hover {
                    background-color: #f2f2f2;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 14px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Lista de Tareas</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>`;

        result.forEach(t_tarea => {
            html += `
            <tr>
                <td>${t_tarea.id}</td>
                <td>${t_tarea.titulo}</td>
                <td>${t_tarea.descripcion}</td>
            </tr>`;
        });

        html += `
                    </tbody>
                </table>
            </div>
            <div class="footer">
                <p>© 2025 Franco Taype</p>
            </div>
        </body>
        </html>`;

        res.send(html);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).send('Error al obtener los datos de la base de datos');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
