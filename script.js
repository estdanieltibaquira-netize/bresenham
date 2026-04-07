/**
 * Función principal que se ejecuta cuando el usuario presiona el botón "Dibujar"
 */
function dibujar() {

    // Se obtienen los valores ingresados por el usuario en los inputs
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    // Se obtiene el canvas y su contexto de dibujo
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Se limpia el canvas para evitar que se sobrepongan dibujos anteriores
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Se dibuja la escala numérica en los ejes
    dibujarEscala();

    // Se ejecuta el algoritmo de Bresenham con las coordenadas dadas
    bresenham(x0, y0, x1, y1);
}


/**
 * Función que dibuja un punto en el canvas
 * @param {number} x Coordenada X
 * @param {number} y Coordenada Y
 */
function plot(x, y) {

    // Se obtiene el contexto del canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Se dibuja un pequeño rectángulo que representa un píxel
    // Se invierte el eje Y para que el origen esté abajo (tipo plano cartesiano)
    ctx.fillRect(x, 400 - y, 3, 3);
}


/**
 * Implementación del algoritmo de Bresenham
 * Este algoritmo permite dibujar líneas usando únicamente operaciones enteras
 */
function bresenham(x0, y0, x1, y1) {

    // Diferencia absoluta en X (distancia horizontal)
    let dx = Math.abs(x1 - x0);

    // Diferencia absoluta en Y (distancia vertical)
    let dy = Math.abs(y1 - y0);

    // Dirección del paso en X (1 o -1)
    let sx = (x0 < x1) ? 1 : -1;

    // Dirección del paso en Y (1 o -1)
    let sy = (y0 < y1) ? 1 : -1;

    // Error inicial
    let err = dx - dy;

    // Ciclo principal del algoritmo
    while (true) {

        // Se dibuja el punto actual
        plot(x0, y0);

        // Se agrega el paso a la tabla
        let tabla = document.getElementById("tabla");

        let fila = "<tr><td>" + x0 + "</td><td>" + y0 + "</td><td>" + err + "</td></tr>";
        tabla.innerHTML += fila;

        // Condición de parada: cuando llega al punto final
        if (x0 === x1 && y0 === y1) break;

        // Se calcula el doble del error
        let e2 = 2 * err;

        // Se ajusta en X si es necesario
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Se ajusta en Y si es necesario
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}


/**
 * Función que dibuja la escala numérica en el canvas
 */
function dibujarEscala() {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Se recorren valores cada 50 unidades para marcar la escala
    for (let i = 0; i <= 400; i += 50) {

        // Números en eje X (parte inferior)
        ctx.fillText(i, i, 395);

        // Números en eje Y (lado izquierdo)
        ctx.fillText(i, 0, 400 - i);
    }
}