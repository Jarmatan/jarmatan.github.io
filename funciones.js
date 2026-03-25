const BCH_ADDRESS = "bitcoincash:qzzvgukpd9f5pas6hvr98vsnpwqnak7rxqt65yuwa5";

function copiarDireccion() {
  const feedback = document.getElementById("feedbackQR");
  const contenedor = document.querySelector(".boton-wrapper");

  // Aumenta padding inferior para el rebote
  contenedor.style.paddingBottom = "40px"; // genera espacio debajo
  feedback.classList.add("visible");

  // Copia al portapapeles
  navigator.clipboard.writeText(BCH_ADDRESS);

  setTimeout(() => {
    feedback.classList.remove("visible");
    contenedor.style.paddingBottom = "18px"; // vuelve al tamaño original
  }, 2000);
}

function actualizarCamposEnvio() {
  const formato = document.getElementById("formato").value;
  const envio = document.getElementById("direccionEnvio");
  envio.style.display = (formato === "blanda" || formato === "dura") ? "block" : "none";
}
const COLORES_FORMATO = {
  ebook: "#b7e4b7",   // verde
  blanda: "#b3c7ff",  // azul
  dura: "#ffe599"     // amarillo
};

function actualizarCamposEnvio() {
  const formato = document.getElementById("formato").value;
  const envio = document.getElementById("direccionEnvio");

  // Mostrar/ocultar dirección
  envio.style.display = (formato === "blanda" || formato === "dura") ? "block" : "none";

  // Aplicar colores
  aplicarColorCampos(formato);
}

function aplicarColorCampos(formato) {
  const color = COLORES_FORMATO[formato] || "#ffffff";

  // Todos los campos del formulario
  const campos = document.querySelectorAll(".formulario input, .formulario textarea, .formulario select");

  campos.forEach(campo => {
    campo.style.backgroundColor = color;
  });

  // También el selector de formato
  const selector = document.getElementById("formato");
  selector.style.backgroundColor = color;
}
function prepararEnvio() {

  // 1. ID de pedido (simple y único)
  const id = "PED-" + Date.now();
  document.getElementById("pedidoInput").value = id;

  // 2. Fecha actual
  const ahora = new Date();
  const fecha = ahora.toLocaleString("es-ES");
  document.getElementById("fechaPedido").value = fecha;

  // 3. Formato + precio
  const formato = document.getElementById("formato").value;

  let textoFormato = "";

  if (formato === "ebook") {
    textoFormato = "eBook (5€)";
  } else if (formato === "blanda") {
    textoFormato = "Tapa blanda (17€)";
  } else if (formato === "dura") {
    textoFormato = "Tapa dura (20€)";
  }

  document.getElementById("formatoPedido").value = textoFormato;

  return true; // permite enviar el formulario
}
