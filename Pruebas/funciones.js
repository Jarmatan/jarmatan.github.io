const BCH_ADDRESS = "bitcoincash:qzzvgukpd9f5pas6hvr98vsnpwqnak7rxqt65yuwa5";
const EMAIL_CONTACTO = "lavenganzademercurio@gmail.com";
const PRECIOS = { ebook: 5, blanda: 17, dura: 20 };
const COLORES_FORMATO = { ebook: "#b7e4b7", blanda: "#b3c7ff", dura: "#ffe599" };

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
    const contenedor = document.getElementById("qr-container");
    contenedor.style.paddingBottom = "60px"; // espacio suficiente
    feedback.classList.add("visible");
    setTimeout(() => {
      feedback.classList.remove("visible");
      contenedor.style.paddingBottom = "12px";
    }, 2000);
  });
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
  const color = COLORES_FORMATO[formato] || "#fff";
  document.querySelectorAll(".formulario input, .formulario textarea, .formulario select")
    .forEach(campo => {
      if(campo.value.trim() !== "") {
        campo.style.boxShadow = `inset 0 0 0 1000px ${color}`;
      } else {
        campo.style.boxShadow = "none";
      }
    });
}

function prepararEnvio() {
  document.getElementById("pedidoInput").value = generarPedidoID();
  document.getElementById("fechaPedido").value = obtenerFechaHora();
  actualizarCamposEnvio();
  return true;
}

// --- Inicialización ---
window.onload = function() {
  document.getElementById("formato")?.addEventListener("change", actualizarCamposEnvio);
  document.querySelectorAll(".formulario input, .formulario textarea, .formulario select")
    .forEach(campo => {
      campo.addEventListener("input", actualizarColoresCampos);
    });
};
