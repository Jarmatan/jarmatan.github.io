const BCH_ADDRESS = "bitcoincash:qzzvgukpd9f5pas6hvr98vsnpwqnak7rxqt65yuwa5";

const COLORES_FORMATO = {
  "eBook (5€)": "#b7e4b7",
  "Tapa blanda (17€)": "#b3c7ff",
  "Tapa dura (20€)": "#ffe599"
};

// ID pedido
function generarPedidoID() {
  return 'MERC-' + Date.now();
}

// Fecha
function obtenerFechaHora() {
  return new Date().toLocaleString();
}

// Copiar dirección
function copiarDireccion() {
  navigator.clipboard.writeText(BCH_ADDRESS);
  const f = document.getElementById("feedbackQR");
  f.classList.add("visible");
  setTimeout(()=>f.classList.remove("visible"),2000);
}

// Mostrar campos envío + colores
function actualizarCamposEnvio() {
  const formato = document.getElementById("formato").value;

  const envio = document.getElementById("direccionEnvio");
  envio.style.display =
    (formato.includes("blanda") || formato.includes("dura")) ? "block" : "none";

  aplicarColorFormato();
}

// Aplicar color
function aplicarColorFormato() {
  const formato = document.getElementById("formato").value;
  const color = COLORES_FORMATO[formato];

  document.querySelectorAll(".formulario input, .formulario textarea")
    .forEach(campo => {
      if (campo.value.trim() !== "" && color) {
        campo.style.boxShadow = `inset 0 0 0 1000px ${color}`;
      } else {
        campo.style.boxShadow = "";
      }
    });
}

// Validación + preparación
function prepararEnvio() {

  const formato = document.getElementById("formato");

  if(formato.value === "") {
    alert("Seleccione un formato");
    return false;
  }

  // rellenar datos ocultos
  document.getElementById("pedidoInput").value = generarPedidoID();
  document.getElementById("fechaPedido").value = obtenerFechaHora();

  // guardar local
  guardarPedidoLocal();

  return true;
}

// Guardado local
function guardarPedidoLocal() {

  const pedido = {
    id: document.getElementById("pedidoInput").value,
    fecha: document.getElementById("fechaPedido").value,
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    formato: document.getElementById("formato").value,
    estado: "pendiente"
  };

  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Eventos de color dinámico
window.onload = function() {
  document.querySelectorAll(".formulario input")
    .forEach(campo => {
      campo.addEventListener("input", aplicarColorFormato);
    });
};
