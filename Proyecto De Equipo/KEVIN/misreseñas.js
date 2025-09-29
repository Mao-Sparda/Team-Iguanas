// ======= CLAVES localStorage =======
const KEY_RESENAS = "kevin_mis_resenas";
const KEY_AVATAR  = "kevin_avatar_dataurl";

// ======= DOM =======
const avatarImg = document.getElementById("avatar");
const fotoInput = document.getElementById("fotoInput");
const btnGuardarFoto = document.getElementById("btnGuardarFoto");
const btnRestablecerFoto = document.getElementById("btnRestablecerFoto");

const form = document.getElementById("formResena");
const tituloPelicula = document.getElementById("tituloPelicula");
const textoResena = document.getElementById("textoResena");
const calificacion = document.getElementById("calificacion");
const listaResenas = document.getElementById("listaResenas");

// ======= HELPERS =======
const loadJSON = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
  catch { return fallback; }
};
const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

// ======= ESTADO INICIAL =======
let resenas = loadJSON(KEY_RESENAS, []);
const avatarGuardado = localStorage.getItem(KEY_AVATAR);
if (avatarGuardado) avatarImg.src = avatarGuardado;

// Semilla si no hay reseñas (para que se vea como la principal)
if (resenas.length === 0) {
  resenas = [
    { id: crypto.randomUUID(), titulo: "El Viaje de los Sueños", texto: "Una obra visual y emotiva. La narrativa es envolvente.", stars: 5 },
    { id: crypto.randomUUID(), titulo: "Aventuras en el Tiempo", texto: "Un poco lenta, pero visualmente hermosa.", stars: 3 },
    { id: crypto.randomUUID(), titulo: "Misterio en la Noche", texto: "Suspenso bien logrado, final predecible.", stars: 4 },
  ];
  saveJSON(KEY_RESENAS, resenas);
}

// ======= RENDER =======
function render() {
  listaResenas.innerHTML = "";
  resenas.forEach(r => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <h3>Película: ${r.titulo}</h3>
      <p class="meta">Calificación: ${stars(r.stars)}</p>
      <p><strong>Mi reseña:</strong> ${r.texto}</p>
      <div class="actions">
        <button class="btn edit"   data-id="${r.id}">Editar</button>
        <button class="btn danger" data-id="${r.id}">Borrar</button>
      </div>
    `;
    listaResenas.appendChild(div);
  });
}
render();

// ======= FORM NUEVA RESEÑA =======
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nueva = {
    id: crypto.randomUUID(),
    titulo: tituloPelicula.value.trim(),
    texto: textoResena.value.trim(),
    stars: parseInt(calificacion.value, 10),
  };
  if (!nueva.titulo || !nueva.texto) return;
  resenas.unshift(nueva);
  saveJSON(KEY_RESENAS, resenas);
  form.reset();
  render();
});

// ======= EDITAR / BORRAR =======
listaResenas.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("danger")) {
    resenas = resenas.filter(r => r.id !== id);
    saveJSON(KEY_RESENAS, resenas);
    render();
  }

  if (e.target.classList.contains("edit")) {
    const r = resenas.find(x => x.id === id);
    if (!r) return;
    const nuevoTexto = prompt("Editar tu reseña:", r.texto);
    if (nuevoTexto === null) return;
    r.texto = nuevoTexto.trim();
    saveJSON(KEY_RESENAS, resenas);
    render();
  }
});

// ======= FOTO DE USUARIO =======
btnGuardarFoto.addEventListener("click", () => {
  const file = fotoInput.files?.[0];
  if (!file) { alert("Selecciona una imagen."); return; }
  const reader = new FileReader();
  reader.onload = () => {
    const dataURL = reader.result;
    avatarImg.src = dataURL;
    localStorage.setItem(KEY_AVATAR, dataURL);
  };
  reader.readAsDataURL(file);
});

btnRestablecerFoto.addEventListener("click", () => {
  localStorage.removeItem(KEY_AVATAR);
  avatarImg.src = "./img/default-avatar.png";
  fotoInput.value = "";
});
