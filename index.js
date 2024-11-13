const exercises = [
    { 
        id: 1, 
        title: "Ejercicio 1", 
        hint: "Usa alert() para mostrar el mensaje '¡Hola, mundo!'", 
        check: () => typeof holaMundo !== 'undefined' && holaMundo === "¡Hola, mundo!"
    },
    { 
        id: 2, 
        title: "Ejercicio 2", 
        hint: "Declara una variable llamada nombre y asígnale tu nombre como texto", 
        check: () => typeof nombre !== 'undefined' && typeof nombre === 'string'
    },
    { 
        id: 3, 
        title: "Ejercicio 3", 
        hint: "Declara dos variables numéricas a y b. Muestra un mensaje si a es mayor que b.", 
        check: () => typeof a !== 'undefined' && typeof b !== 'undefined' && (a > b || a < b)
    },
    { 
        id: 4, 
        title: "Ejercicio 4", 
        hint: "Usa prompt() para pedir la edad y guárdala en una variable llamada edad.", 
        check: () => typeof edad !== 'undefined' && !isNaN(Number(edad))
    },
    { 
        id: 5, 
        title: "Ejercicio 5", 
        hint: "Declara dos variables numéricas iguales y muestra un mensaje si son iguales.", 
        check: () => typeof num1 !== 'undefined' && typeof num2 !== 'undefined' && num1 === num2
    },
    { 
        id: 6, 
        title: "Ejercicio 6", 
        hint: "Usa confirm() para preguntar si te gusta el chocolate y guarda el resultado en la variable respuesta.", 
        check: () => typeof respuesta !== 'undefined' && typeof respuesta === 'boolean'
    },
    { 
        id: 7, 
        title: "Ejercicio 7", 
        hint: "Pide al usuario su edad y muestra un mensaje si es mayor de 18.", 
        check: () => typeof edad_usuario !== 'undefined' && !isNaN(Number(edad_usuario)) && Number(edad_usuario) > 18
    },
    { 
        id: 8, 
        title: "Ejercicio 8", 
        hint: "Pide al usuario que escriba 'sí' o 'no'. Si escribe otra cosa, muestra un mensaje de error.", 
        check: () => typeof respuestaUsuario !== 'undefined'
    },
    { 
        id: 9, 
        title: "Ejercicio 9", 
        hint: "Pide una palabra al usuario y verifica si es 'JavaScript'.", 
        check: () => typeof palabra !== 'undefined' && (palabra === "JavaScript" || palabra !== "JavaScript")
    },    
    { 
        id: 10, 
        title: "Ejercicio 10", 
        hint: "Declara una variable numero, calcula su doble y verifica si es mayor que 10.", 
        check: () => typeof numero !== 'undefined' && typeof doble !== 'undefined' && doble === numero * 2 && doble > 10
    }
];


function initializeExercises() {
    const list = document.getElementById("exercise-list");
    exercises.forEach(exercise => {
        const item = document.createElement("li");
        item.className = "exercise-item";
        
        // Nombre del ejercicio
        const title = document.createElement("span");
        title.innerText = exercise.title;
        
        // Estado de validación
        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";
        checkmark.innerText = "❌"; // Cambia a ✅ si está correcto
        
        // Botón para pista
        const hintButton = document.createElement("button");
        hintButton.innerText = "Mostrar pista";
        hintButton.onclick = () => alert(exercise.hint);
        
        item.appendChild(title);
        item.appendChild(checkmark);
        item.appendChild(hintButton);
        list.appendChild(item);
        
        // Validación automática del ejercicio
        validateExercise(exercise, checkmark);
    });
}

// Función para validar ejercicios
function validateExercise(exercise, checkmark) {
    try {
        if (exercise.check()) {
            checkmark.innerText = "✅";
        }
    } catch (e) {
        console.error(`Error al validar el ejercicio ${exercise.id}: ${e.message}`);
    }
}

// Inicialización de ejercicios en la página
initializeExercises();
