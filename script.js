function actualizarContador() {
    // 4 de julio de 2024, 23:59:00
    // Mes en JS es 0-indexado (6 es Julio)
    const fechaInicio = new Date(2026, 6, 4, 23, 59, 0);
    const ahora = new Date();
    
    const diferencia = ahora - fechaInicio;

    if (diferencia >= 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;
    }
}

// Actualizar cada minuto
setInterval(actualizarContador, 60000);
// Ejecutar al cargar
actualizarContador();