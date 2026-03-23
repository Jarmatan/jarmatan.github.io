function actualizarCamposEnvio() {
  const formato = document.getElementById("formato").value;
  const bloque = document.getElementById("direccionEnvio");

  if (formato === "ebook") {
    bloque.style.display = "none";
  } else {
    bloque.style.display = "block";
  }
}

function copiarDireccion() {
  const direccion = "TU_DIRECCION_BCH_AQUI";
  navigator.clipboard.writeText(direccion);

  const feedback = document.getElementById("feedbackQR");
  feedback.style.display = "block";
  setTimeout(() => feedback.style.display = "none", 2000);
}

function validarFormulario(formato) {

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !email) {
    alert("Nombre y email son obligatorios");
    return false;
  }

  if (formato !== "ebook") {
    const direccion = document.getElementById("direccion").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const provincia = document.getElementById("provincia").value.trim();
    const postal = document.getElementById("postal").value.trim();
    const pais = document.getElementById("pais").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!direccion || !ciudad || !provincia || !postal || !pais || !telefono) {
      alert("Debe completar todos los datos de envío");
      return false;
    }
  }

  return true;
}

function generarMensaje() {

  const formato = document.getElementById("formato").value;

  if (!formato) {
    alert("Seleccione un formato");
    return;
  }

  if (!validarFormulario(formato)) return;

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  let mensaje = "PEDIDO - LA VENGANZA DE MERCURIO\n\n";

  mensaje += "Formato: " + formato + "\n";
  mensaje += "Nombre: " + nombre + "\n";
  mensaje += "Email: " + email + "\n";

  if (formato !== "ebook") {
    const direccion = document.getElementById("direccion").value;
    const ciudad = document.getElementById("ciudad").value;
    const provincia = document.getElementById("provincia").value;
    const postal = document.getElementById("postal").value;
    const pais = document.getElementById("pais").value;
    const telefono = document.getElementById("telefono").value;

    mensaje += "\nDATOS DE ENVÍO\n";
    mensaje += "Dirección: " + direccion + "\n";
    mensaje += "Ciudad: " + ciudad + "\n";
    mensaje += "Provincia: " + provincia + "\n";
    mensaje += "Código Postal: " + postal + "\n";
    mensaje += "País: " + pais + "\n";
    mensaje += "Teléfono: " + telefono + "\n";
  }

  document.getElementById("mensajePedido").value = mensaje;
}

function copiarMensaje() {
  const texto = document.getElementById("mensajePedido");
  texto.select();
  document.execCommand("copy");
}

function enviarEmail() {

  const mensaje = document.getElementById("mensajePedido").value;

  if (!mensaje) {
    alert("Primero genere el pedido");
    return;
  }

  const destinatario = "lavenganzademercurio@gmail.com";
  const asunto = encodeURIComponent("Pedido - La Venganza de Mercurio");
  const cuerpo = encodeURIComponent(mensaje);

  window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
}
