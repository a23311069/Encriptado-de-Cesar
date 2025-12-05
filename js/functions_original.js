// Llena todos los selectores con opciones del 0 al 24
function cargarSelects() {
    const selects = document.getElementsByTagName("select");
    for (let i = 0; i < selects.length; i++) {
        for (let j = 0; j < 25; j++) {
            const option = document.createElement("option");
            option.value = j;
            option.textContent = j;
            selects[i].appendChild(option);
        }
    }
}

// Convierte el texto del textarea a mayúsculas
function convertirMayus(textarea) {
    textarea.value = textarea.value.toUpperCase();
}

// Permite solo letras A-Z, espacio, enter y backspace
function validarContenido(event) {
    const keyCode = event.keyCode || event.which;
    const tecla = String.fromCharCode(keyCode);
    if (!/^[A-Z]$/.test(tecla) && keyCode !== 32 && keyCode !== 13 && keyCode !== 8) {
        event.preventDefault()
    }
}

// Encripta el mensaje usando el cifrado César con las 6 claves
function encriptar() {
    var mensaje = document.getElementById("txtAreaEncriptar").value;
    var salida = "";
    var k = 1; // Índice de la clave actual (key1 a key6)
    
    for (let i = 0; i < mensaje.length; i++) {
        // Si no es espacio ni salto de línea, encripta la letra
        if (mensaje.charCodeAt(i) !== 32 && mensaje.charCodeAt(i) !== 13) {
            var letra = mensaje.charCodeAt(i);
            var movimiento = parseInt(document.getElementById("key" + k++).value);
            
            // Si se pasa de Z, vuelve al inicio del alfabeto
            if (letra + movimiento > 90) salida += String.fromCharCode(letra + movimiento - 26);
            else salida += String.fromCharCode(letra + movimiento);
            
            // Reinicia el ciclo de claves después de key6
            if (k == 7) k = 1;
        }
        else salida += String.fromCharCode(mensaje.charCodeAt(i)); // Mantiene espacios y saltos de línea
    }
    document.getElementById("txtAreaEncriptado").value = salida;
}

// Carga un mensaje y claves de ejemplo
function ejemplo() {
    document.getElementById("txtAreaEncriptar").value = "HOLA MUNDO COMO ESTAS";
    document.getElementById("key1").value = "1";
    document.getElementById("key2").value = "2";
    document.getElementById("key3").value = "3";
    document.getElementById("key4").value = "4";
    document.getElementById("key5").value = "5";
    document.getElementById("key6").value = "6";
}

// Descarga el mensaje encriptado como archivo .txt
function guardar() {
    const txtarea = document.getElementById('txtAreaEncriptado');
    const txtToSave = txtarea.value;
    const filename = 'mensaje_encriptado.txt';

    const blob = new Blob([txtToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Limpieza
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Descarga las claves como archivo .txt
function guardarLlave() {
    const Llaves = `${document.getElementById("key1").value}
${document.getElementById("key2").value}
${document.getElementById("key3").value}
${document.getElementById("key4").value}
${document.getElementById("key5").value}
${document.getElementById("key6").value}`;
    const txtToSave = Llaves;
    const filename = 'Llaves.txt';

    const blob = new Blob([txtToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Limpieza
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}