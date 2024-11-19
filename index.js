const exercises = [
    { 
        id: 1, 
        title: "Función Saludar", 
        hint: "¿Recordaste poner los paréntesis y las comillas? La concatenación en JavaScript se hace con el signo +", 
        check: () => {
            try {
                return typeof saludar === 'function' && 
                       saludar('test') === '¡Hola, test!';
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 2, 
        title: "Función Cuadrado", 
        hint: "Para multiplicar un número por sí mismo puedes usar numero * numero, o también numero ** 2", 
        check: () => {
            try {
                return typeof cuadrado === 'function' && 
                       cuadrado(4) === 16 && 
                       cuadrado(2) === 4;
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 3, 
        title: "Función Es Par", 
        hint: "El operador % devuelve el residuo. Si un número dividido entre 2 tiene residuo 0, es par", 
        check: () => {
            try {
                return typeof esPar === 'function' && 
                       esPar(2) === true && 
                       esPar(3) === false;
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 4, 
        title: "Función Día de la Semana", 
        hint: "¿Pusiste break después de cada case? ¿Incluiste el caso default para números inválidos?", 
        check: () => {
            try {
                return typeof diaDeLaSemana === 'function' && 
                       diaDeLaSemana(1) === 'lunes' && 
                       diaDeLaSemana(2) === 'martes' && 
                       diaDeLaSemana(3) === 'miércoles' && 
                       diaDeLaSemana(4) === 'jueves' && 
                       diaDeLaSemana(5) === 'viernes' && 
                       diaDeLaSemana(6) === 'sábado' && 
                       diaDeLaSemana(7) === 'domingo';
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 5, 
        title: "Función Calcular Descuento", 
        hint: "Para calcular el descuento: primero calcula el porcentaje (descuento/100) y luego réstalo del precio", 
        check: () => {
            try {
                return typeof calcularDescuento === 'function' && 
                       calcularDescuento(100, 20) === 80;
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 6, 
        title: "Función Clasificar Edad", 
        hint: "Recuerda que los rangos de edad no se solapan. Usa >= y < para definir los rangos correctamente", 
        check: () => {
            try {
                return typeof clasificarEdad === 'function' && 
                       clasificarEdad(10) === 'Niño' && 
                       clasificarEdad(15) === 'Adolescente' && 
                       clasificarEdad(20) === 'Adulto';
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 7, 
        title: "Función Operaciones", 
        hint: "En el switch, cada case debe ser el operador como string: case '+', case '*', etc.", 
        check: () => {
            try {
                return typeof operacion === 'function' && 
                       operacion(4, 2, '+') === 6 && 
                       operacion(4, 2, '*') === 8 &&
                       operacion(4, 2, '-') === 2 &&
                       operacion(4, 2, '/') === 2;
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 8, 
        title: "Función Nota a Texto", 
        hint: "Puedes agrupar varios casos usando case 7: case 8: para notas que devuelvan el mismo texto", 
        check: () => {
            try {
                return typeof notaTexto === 'function' && 
                       notaTexto(10) === 'Sobresaliente' &&
                       notaTexto(7) === 'Notable';
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 9, 
        title: "Función Saludo por Idioma", 
        hint: "Los strings en JavaScript son sensibles a mayúsculas. 'es' no es lo mismo que 'ES'", 
        check: () => {
            try {
                return typeof saludoIdioma === 'function' && 
                       saludoIdioma('es') === 'Hola' &&
                       saludoIdioma('xyz') === 'Idioma no soportado';
            } catch(e) {
                return false;
            }
        }
    },
    { 
        id: 10, 
        title: "Función Tamaño Palabra", 
        hint: "texto.length te da la longitud. Comienza por el caso más pequeño o más grande primero", 
        check: () => {
            try {
                return typeof tamañoPalabra === 'function' && 
                       tamañoPalabra('hi') === 'Corta' &&
                       tamañoPalabra('JavaScript') === 'Media';
            } catch(e) {
                return false;
            }
        }
    }
];


function initializeExercises() {
    const list = document.getElementById("exercise-list");
    exercises.forEach(exercise => {
        const card = document.createElement("div");
        card.className = "exercise-card bg-white rounded-lg shadow-md p-6 flex flex-col";
        
        // Cabecera del ejercicio
        const header = document.createElement("div");
        header.className = "flex items-center justify-between mb-4";
        
        const title = document.createElement("h3");
        title.className = "text-lg font-semibold text-gray-800";
        title.innerText = exercise.title;
        
        const checkmark = document.createElement("span");
        checkmark.className = "text-2xl";
        checkmark.innerHTML = "❌"; // Cambiará a ✅
        
        header.appendChild(title);
        header.appendChild(checkmark);
        
        // Botón de pista
        const hintButton = document.createElement("button");
        hintButton.className = "mt-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors";
        hintButton.innerHTML = `
            <i class="fas fa-lightbulb mr-2"></i>
            Ver pista
        `;
        hintButton.onclick = () => {
            Swal.fire({
                title: 'Pista',
                text: exercise.hint,
                icon: 'info',
                confirmButtonColor: '#4f46e5'
            });
        };
        
        // Ensamblaje del card
        card.appendChild(header);
        card.appendChild(hintButton);
        list.appendChild(card);
        
        // Validación automática
        validateExercise(exercise, checkmark);
    });
}

// Función de validación actualizada
function validateExercise(exercise, checkmark) {
    setInterval(() => {
        try {
            const isValid = exercise.check();
            checkmark.innerHTML = isValid ? 
                '<i class="fas fa-check-circle text-green-500"></i>' : 
                '<i class="fas fa-times-circle text-red-500"></i>';
        } catch (e) {
            checkmark.innerHTML = '<i class="fas fa-times-circle text-red-500"></i>';
        }
    }, 1000);
}

// Inicialización de ejercicios en la página
initializeExercises();
