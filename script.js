function dibujar() {

    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    bresenham(x0, y0, x1, y1);
    dibujarEscala();
}

function plot(x, y) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.fillRect(x, 400-y, 3, 3); // aqui invertimos y para que nuestro origen quede en la esquina izquierda
}
function bresenham(x0, y0, x1, y1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    while (true) {

        plot(x0, y0);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
        let tabla = document.getElementById("tabla");

        let fila = "<tr><td>" + x0 + "</td><td>" + y0 + "</td><td>" + err + "</td></tr>";
        tabla.innerHTML += fila;
    }
    function dibujarEscala() {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    for (let i = 0; i <= 400; i += 50) {
        ctx.fillText(i, i, 395);
        ctx.fillText(i, 0, 400 - i);
    }
}
}