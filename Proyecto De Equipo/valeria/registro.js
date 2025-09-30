// Mostrar vista previa de la foto de perfil
document.getElementById("foto").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById("preview").src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Validar formulario y mostrar mensajes
function finalizarRegistro() {
  const usuario = document.getElementById("usuario").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();
  const foto = document.getElementById("foto").value.trim();
  const pais = document.getElementById("pais").value;
  const fecha = document.getElementById("fecha").value;
  const mensaje = document.getElementById("mensaje");

  // Validar que todos los campos estén llenos
  if (!usuario || !correo || !password || !foto || !pais || !fecha) {
    mensaje.textContent = "Llena los campos";
    mensaje.className = "w3-center w3-margin-top w3-text-red";
  } else {
    mensaje.textContent = "Bienvenido a la comunidad cinéfila";
    mensaje.className = "w3-center w3-margin-top w3-text-green";
  }
}

