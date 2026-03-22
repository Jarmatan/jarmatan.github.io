const BCH_ADDRESS = "bitcoincash:qzzvgukpd9f5pas6hvr98vsnpwqnak7rxqt65yuwa5";
const EMAIL_CONTACTO = "lavenganzademercurio@gmail.com";
const PRECIOS = { ebook: 5, blanda: 17, dura: 20 };
const COLORES_FORMATO = {
  ebook: "#b7e4b7",
  blanda: "#b3c7ff",
  dura: "#ffe599"
};

// --- Compras ---
function generarPedidoID() {
  return 'MERC-' + Date.now();
}

function obtenerFechaHora() {
  return new Date().toLocaleString();
}

function copiarDireccion() {
  navigator.clipboard.writeText(BCH_ADDRESS).then(() => {
    const feedback = document.getElementById("feedbackQR");
    const contenedor = document.querySelector(".boton-wrapper");
    contenedor.style.paddingBottom = "40px";
    feedback.classList.add("visible");
    setTimeout(() => {
      feedback.classList.remove("visible");
      contenedor.style.paddingBottom = "18px";
    }, 2000);
  });
}

function copiarEmail() {
  navigator.clipboard.writeText(EMAIL_CONTACTO);
  alert("Email copiado: " + EMAIL_CONTACTO);
}

function actualizarCamposEnvio() {
  const formato = document.getElementById("formato").value;
  const envio = document.getElementById("direccionEnvio");
  envio.style.display = (formato === "blanda" || formato === "dura") ? "block" : "none";
  document.getElementById("formatoPedido").value = `${formato} ${PRECIOS[formato] || ''}€`;
  document.getElementById("formato").style.backgroundColor = formato ? COLORES_FORMATO[formato] : "#fff";
  actualizarColoresCampos();
}

function actualizarColoresCampos() {
  const formato = document.getElementById("formato").value;
  const color = COLORES_FORMATO[formato];
  document.querySelectorAll(".formulario input, .formulario textarea")
    .forEach(campo => {
      if (campo.value.trim() !== "" && color) {
        campo.style.boxShadow = `inset 0 0 0 1000px ${color}`;
      } else {
        campo.style.boxShadow = "none";
      }
    });
}

function generarMensaje() {
  const pedido = document.getElementById("pedidoInput").value;
  const fecha = document.getElementById("fechaPedido").value;
  const formato = document.getElementById("formatoPedido").value;
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const direccion = document.getElementById("direccion")?.value || "";
  const ciudad = document.getElementById("ciudad")?.value || "";
  const postal = document.getElementById("postal")?.value || "";
  const pais = document.getElementById("pais")?.value || "";

  let mensaje = `Pedido libro "La Venganza de Mercurio"

ID de pedido:
${pedido}

Fecha y hora:
${fecha}

Formato y precio:
${formato}

Nombre:
${nombre}

Email:
${email}
`;

  if(formato.includes("blanda") || formato.includes("dura")) {
    mensaje += `Dirección de envío:
${direccion}
${ciudad}
${postal}
${pais}
`;
  }

  document.getElementById("mensajePedido").value = mensaje;
  actualizarColoresCampos();
}

function copiarMensaje() {
  const texto = document.getElementById("mensajePedido");
  texto.select();
  document.execCommand("copy");
  alert("Mensaje copiado. Envíalo a: " + EMAIL_CONTACTO);
}

// --- Donaciones ---
function copiarDireccionDonaciones() {
  navigator.clipboard.writeText(BCH_ADDRESS).then(() => {
    const feedback = document.getElementById("feedbackQRDonaciones");
    const contenedor = feedback.parentElement;
    contenedor.style.paddingBottom = "40px";
    feedback.classList.add("visible");
    setTimeout(() => {
      feedback.classList.remove("visible");
      contenedor.style.paddingBottom = "12px";
    }, 2000);
  });
}

// --- Inicialización ---
window.onload = function() {
  if(document.getElementById("pedidoInput")) {
    document.getElementById("pedidoInput").value = generarPedidoID();
    document.getElementById("fechaPedido").value = obtenerFechaHora();
    document.querySelectorAll(".formulario input, .formulario textarea")
      .forEach(campo => {
        campo.addEventListener("input", actualizarColoresCampos);
      });
  }
};
