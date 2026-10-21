
document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll(".capa");
    const resultado = document.getElementById("resultado");

    botones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            botones.forEach(function (capa) {
                capa.classList.remove("activa");
            });

            boton.classList.add("activa");

            const numero = boton.querySelector("b").textContent;
            const nombre = boton.textContent.trim();
            const informacion = boton.dataset.info;

            resultado.innerHTML = `
                <h3>Capa ${numero} — ${nombre.replace(numero, "").trim()}</h3>
                <p>${informacion}</p>
            `;
        });
    });
});
/* funcionamiento de modelo osi */

document.addEventListener("DOMContentLoaded", function () {
    const explorador = document.getElementById("exploradorOSI");

    if (!explorador) return;

    const botones = explorador.querySelectorAll(".fila-osi");
    const info = document.getElementById("infoCapa");
    const anterior = document.getElementById("anteriorCapa");
    const siguiente = document.getElementById("siguienteCapa");

    const capas = {
        1: {
            nombre: "Física",
            descripcion: "Transmite los bits mediante señales eléctricas, ópticas o inalámbricas a través de un medio físico."
        },
        2: {
            nombre: "Enlace de datos",
            descripcion: "Organiza los datos en tramas y facilita la comunicación entre dispositivos conectados al mismo enlace."
        },
        3: {
            nombre: "Red",
            descripcion: "Se encarga del direccionamiento lógico y de encontrar rutas para que los paquetes lleguen a su destino."
        },
        4: {
            nombre: "Transporte",
            descripcion: "Gestiona el transporte de los datos entre aplicaciones y puede controlar la entrega y los errores."
        },
        5: {
            nombre: "Sesión",
            descripcion: "Establece, administra y finaliza las sesiones de comunicación entre aplicaciones."
        },
        6: {
            nombre: "Presentación",
            descripcion: "Se ocupa de la representación de los datos, como su formato, codificación y transformación."
        },
        7: {
            nombre: "Aplicación",
            descripcion: "Proporciona servicios de red que utilizan las aplicaciones, como la navegación web y el correo electrónico."
        }
    };

    let capaActual = 5;

    function mostrarCapa(numero) {
        capaActual = Math.max(1, Math.min(7, numero));

        botones.forEach(function (boton) {
            const seleccionada = Number(boton.dataset.capa) === capaActual;

            boton.classList.toggle("activa", seleccionada);

            if (seleccionada) {
                boton.innerHTML = `
                    <span class="numero">${capaActual}</span>
                    <span>${capas[capaActual].nombre}</span>
                    <span class="estado">ACTIVA</span>
                `;
                boton.setAttribute("aria-pressed", "true");
            } else {
                const n = Number(boton.dataset.capa);
                boton.innerHTML = `
                    <span class="numero">${n}</span>
                    <span>${capas[n].nombre}</span>
                `;
                boton.setAttribute("aria-pressed", "false");
            }
        });

        info.innerHTML = `
            <h3>Capa ${capaActual} — ${capas[capaActual].nombre}</h3>
            <p>${capas[capaActual].descripcion}</p>
        `;

        anterior.disabled = capaActual === 1;
        siguiente.disabled = capaActual === 7;
    }

    botones.forEach(function (boton) {
        boton.addEventListener("click", function () {
            mostrarCapa(Number(boton.dataset.capa));
        });
    });

    anterior.addEventListener("click", function () {
        mostrarCapa(capaActual - 1);
    });

    siguiente.addEventListener("click", function () {
        mostrarCapa(capaActual + 1);
    });

    mostrarCapa(5);
});
