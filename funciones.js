const BCH_ADDRESS = "bitcoincash:qzzvgukpd9f5pas6hvr98vsnpwqnak7rxqt65yuwa5";

/* =========================
   COPIAR DIRECCIÓN BCH
========================= */
function copiarDireccion() {
  const feedback = document.getElementById("feedbackQR");
  const contenedor = document.querySelector(".boton-wrapper");

  if (!feedback || !contenedor) return;

  contenedor.style.paddingBottom = "40px";
  feedback.classList.add("visible");

  navigator.clipboard.writeText(BCH_ADDRESS);

  setTimeout(() => {
    feedback.classList.remove("visible");
    contenedor.style.paddingBottom = "18px";
  }, 2000);
}

/* =========================
   COLORES POR FORMATO
========================= */
const COLORES_FORMATO = {
  ebook: "#b7e4b7",
  blanda: "#b3c7ff",
  dura: "#ffe599"
};

/* =========================
   ACTUALIZAR CAMPOS ENVÍO
========================= */
function actualizarCamposEnvio() {
  const formato = document.getElementById("formato")?.value;
  const envio = document.getElementById("direccionEnvio");

  if (!envio) return;

  envio.style.display = (formato === "blanda" || formato === "dura") ? "block" : "none";

  aplicarColorCampos(formato);
}

/* =========================
   APLICAR COLOR CAMPOS
========================= */
function aplicarColorCampos(formato) {
  const color = COLORES_FORMATO[formato] || "#ffffff";

  const campos = document.querySelectorAll(".formulario input, .formulario textarea, .formulario select");

  campos.forEach(campo => {
    campo.style.backgroundColor = color;
  });

  const selector = document.getElementById("formato");
  if (selector) selector.style.backgroundColor = color;
}

/* =========================
   PREPARAR ENVÍO (FIX REAL)
========================= */
function prepararEnvio() {

  const pedidoInput = document.getElementById("pedidoInput");
  const fechaInput = document.getElementById("fechaPedido");
  const formatoInput = document.getElementById("formatoPedido");
  const formatoSelect = document.getElementById("formato");

  if (!pedidoInput || !fechaInput || !formatoInput || !formatoSelect) {
    console.error("Error: faltan elementos del formulario");
    return true;
  }

  // ID único
  const id = "PED-" + Date.now();
  pedidoInput.value = id;

  // Fecha
  const fecha = new Date().toLocaleString("es-ES");
  fechaInput.value = fecha;

  // Formato
  const formato = formatoSelect.value;

  let textoFormato = "";

  if (formato === "ebook") textoFormato = "eBook (5€)";
  if (formato === "blanda") textoFormato = "Tapa blanda (17€)";
  if (formato === "dura") textoFormato = "Tapa dura (20€)";

  formatoInput.value = textoFormato;

  return true;
}

/* =========================
   EVENTO SEGURO DE ENVÍO
========================= */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulario");

  if (form) {
    form.addEventListener("submit", prepararEnvio);
  }
});
