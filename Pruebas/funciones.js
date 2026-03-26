// Dirección BCH
const BCH_ADDRESS = "bitcoincash:qzzvgukpd9f5pas6hvr98vsnpwqnak7rxqt65yuwa5";

// Colores según formato
const COLORES_FORMATO = {
  ebook: "#b7e4b7",   // verde
  blanda: "#b3c7ff",  // azul
  dura: "#ffe599"     // amarillo
};

// ────────────────────────────────
// Copiar dirección BCH con feedback
// ────────────────────────────────
function copiarDireccion() {
  const feedback = document.getElementById("feedbackQR");
  const contenedor = document.querySelector(".boton-wrapper");

  // Aumenta padding inferior para el rebote
  contenedor.style.paddingBottom = "40px";
  feedback.classList.add("visible");

  // Copia al portapapeles
  navigator.clipboard.writeText(BCH_ADDRESS);

  setTimeout(() => {
    feedback.classList.remove("visible");
    contenedor.style.paddingBottom = "18px"; // vuelve al tamaño original
  }, 2000);
}

// ────────────────────────────────
// Mostrar/ocultar dirección y aplicar colores
// ────────────────────────────────
function actualizarCamposEnvio() {
  const formato = document.getElementById("formato").value;
  const envio = document.getElementById("direccionEnvio");
  const formulario = document.querySelector(".formulario");

  // Mostrar/ocultar sección de envío y ajustar required
  if (formato === "blanda" || formato === "dura") {
    envio.style.display = "block";
    // Campos obligatorios solo para papel
    envio.querySelectorAll("input").forEach(campo => campo.required = true);
  } else {
    envio.style.display = "none";
    // Quitar required para ebook
    envio.querySelectorAll("input").forEach(campo => campo.required = false);
  }

  // Aplicar colores
  aplicarColorCampos(formato);

  // Cambiar clase del formulario para CSS de autofill
  formulario.classList.remove("formato-ebook", "formato-blanda", "formato-dura");
  if (formato in COLORES_FORMATO) {
    formulario.classList.add("formato-" + formato);
  }
}

// ────────────────────────────────
// Aplicar colores a todos los campos y al selector
// ────────────────────────────────
function aplicarColorCampos(formato) {
  const color = COLORES_FORMATO[formato] || "#ffffff";

  const campos = document.querySelectorAll(".formulario input, .formulario textarea, .formulario select");

  campos.forEach(campo => {
    campo.style.setProperty("background-color", color, "important");
  });

  const selector = document.getElementById("formato");
  selector.style.setProperty("background-color", color, "important");
}

// ────────────────────────────────
// Preparar el campo oculto con formato, precio, ID de pedido y fecha
// ────────────────────────────────
function prepararEnvio() {
  const formatoSelect = document.getElementById("formato");
  const formato = formatoSelect.value;

  // Validar que se ha elegido formato
  if (formato === "") {
    alert("Por favor, seleccione un formato.");
    return false;
  }

  // Guardar el texto visible (incluye precio) en el campo oculto
  const formatoTexto = formatoSelect.options[formatoSelect.selectedIndex].text;
  document.getElementById("formatoPedido").value = formatoTexto;

  // Generar ID de pedido: simple random alfanumérico de 8 caracteres
  const idPedido = 'PED-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById("pedidoInput").value = idPedido;

  // Generar fecha y hora actual en formato local
  const fechaHora = new Date().toLocaleString(); 
  document.getElementById("fechaPedido").value = fechaHora;

  return true;
}

// ────────────────────────────────
// Inicialización al cargar la página
// ────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  actualizarCamposEnvio(); // ajusta estado y colores según el formato seleccionado al cargar
});
