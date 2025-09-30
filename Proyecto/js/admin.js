function validarRUT(rut) {
  return /^[0-9]{7,8}-[0-9kK]$/.test(rut);
}

function validarCorreo(correo) {
  return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|duoc\.cl)$/.test(correo);
}

function validarPassword(pass) {
  return pass.length >= 6;
}

function validarStock(stock) {
  return !isNaN(stock) && Number(stock) >= 0;
}

function validarPrecio(precio) {
  return !isNaN(precio) && Number(precio) > 0;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const rut = document.getElementById("rut")?.value || "";
    const correo = document.getElementById("correo")?.value || "";
    const pass = document.getElementById("password")?.value || "";
    const stock = document.getElementById("stock")?.value || "";
    const precio = document.getElementById("precio")?.value || "";

    let errores = [];

    if (rut && !validarRUT(rut)) errores.push("RUT inválido (ej: 12345678-9).");
    if (correo && !validarCorreo(correo)) errores.push("Correo no permitido.");
    if (pass && !validarPassword(pass)) errores.push("La contraseña debe tener mínimo 6 caracteres.");
    if (stock && !validarStock(stock)) errores.push("El stock debe ser un número válido.");
    if (precio && !validarPrecio(precio)) errores.push("El precio debe ser un número válido.");

    if (errores.length > 0) {
      e.preventDefault();
      alert("Errores:\n- " + errores.join("\n- "));
    }
  });
});
