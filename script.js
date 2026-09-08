function actualizarContador() {

    // 4 de julio de 2026 a las 23:59
    const fechaInicio = new Date(2026, 6, 4, 23, 59, 0);

    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    if (diferencia >= 0) {

        const dias = Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (diferencia % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutos = Math.floor(
            (diferencia % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        document.getElementById("dias").textContent = dias;
        document.getElementById("horas").textContent = horas;
        document.getElementById("minutos").textContent = minutos;

    } else {

        document.getElementById("dias").textContent = "0";
        document.getElementById("horas").textContent = "0";
        document.getElementById("minutos").textContent = "0";
    }
}

// Ejecutar inmediatamente
actualizarContador();

// Actualizar cada segundo
setInterval(actualizarContador, 1000);
