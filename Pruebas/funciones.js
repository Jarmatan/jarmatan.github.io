const BCH_ADDRESS = "bitcoincash:qzz...";
const PRECIOS = { ebook: 5, blanda: 17, dura: 20 };

// ID pedido
function generarPedidoID() {
  return 'MERC-' + Date.now();
}

// Fecha
function obtenerFechaHora() {
  return new Date().toLocaleString();
}

// QR
function copiarDireccion() {
  navigator.clipboard.writeText(BCH_ADDRESS);
  const f = document.getElementById("feedbackQR");
  f.classList.add("visible");
  setTimeout(()=>f.classList.remove("visible"),2000);
}

// Mostrar envío
function actualizarCamposEnvio() {
  const formato = document.getElementById("formato").value;
  document.getElementById("direccionEnvio").style.display =
    (formato === "blanda" || formato === "dura") ? "block" : "none";
}

// --- GUARDADO LOCAL ---
function guardarPedidoLocal() {

  const pedido = {
    id: generarPedidoID(),
    fecha: obtenerFechaHora(),
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    formato: document.getElementById("formato").value,
    estado: "pendiente"
  };

  // guardar en hidden (para email)
  document.getElementById("pedidoInput").value = pedido.id;
  document.getElementById("fechaPedido").value = pedido.fecha;

  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}
