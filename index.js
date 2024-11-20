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
        
        // Header (mantiene el código existente)
        const header = document.createElement("div");
        header.className = "flex items-center justify-between mb-4";
        
        const title = document.createElement("h3");
        title.className = "text-lg font-semibold text-gray-800";
        title.innerText = exercise.title;
        
        const checkmark = document.createElement("span");
        checkmark.className = "text-2xl";
        checkmark.innerHTML = "❌";
        
        header.appendChild(title);
        header.appendChild(checkmark);
        
        // Área de pruebas
        const testArea = document.createElement("div");
        testArea.className = "mt-4 p-4 bg-gray-50 rounded-lg";
        
        // Crear campos de entrada según el ejercicio
        const inputs = createInputsForExercise(exercise);
        const testButton = document.createElement("button");
        testButton.className = "w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors";
        testButton.innerHTML = '<i class="fas fa-play mr-2"></i>Probar función';
        
        const resultArea = document.createElement("div");
        resultArea.className = "mt-3 p-3 bg-gray-100 rounded-md hidden";
        
        testButton.onclick = () => {
            resultArea.classList.remove('hidden');
            try {
                const result = runExerciseTest(exercise, inputs);
                resultArea.innerHTML = `
                    <div class="text-sm">
                        <div class="font-semibold mb-2">Resultado:</div>
                        <div class="font-mono bg-white p-2 rounded">
                            ${formatTestResult(result)}
                        </div>
                    </div>
                `;
            } catch (error) {
                resultArea.innerHTML = `
                    <div class="text-red-600 text-sm">
                        <div class="font-semibold mb-2">Error:</div>
                        <div class="font-mono">${error.message}</div>
                    </div>
                `;
            }
        };
        
        testArea.append(...inputs, testButton, resultArea);
        
        // Botón de pista (mantiene el código existente)
        const hintButton = document.createElement("button");
        hintButton.className = "mt-4 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors";
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
        
        // Ensamblaje final
        card.appendChild(header);
        card.appendChild(testArea);
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

function createInputsForExercise(exercise) {
    const inputConfigs = {
        1: [{ name: 'nombre', type: 'text', placeholder: 'Introduce un nombre' }],
        2: [{ name: 'numero', type: 'number', placeholder: 'Introduce un número' }],
        3: [{ name: 'numero', type: 'number', placeholder: 'Introduce un número' }],
        4: [{ name: 'dia', type: 'number', placeholder: 'Número del 1 al 7' }],
        5: [
            { name: 'precio', type: 'number', placeholder: 'Precio' },
            { name: 'descuento', type: 'number', placeholder: 'Descuento %' }
        ],
        6: [{ name: 'edad', type: 'number', placeholder: 'Edad' }],
        7: [
            { name: 'num1', type: 'number', placeholder: 'Primer número' },
            { name: 'num2', type: 'number', placeholder: 'Segundo número' },
            { name: 'operador', type: 'text', placeholder: '+, -, *, /' }
        ],
        8: [{ name: 'nota', type: 'number', placeholder: 'Nota (0-10)' }],
        9: [{ name: 'idioma', type: 'text', placeholder: 'es, en, fr' }],
        10: [{ name: 'texto', type: 'text', placeholder: 'Escribe un texto' }]
    };

    const configs = inputConfigs[exercise.id] || [];
    return configs.map(config => {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'mb-2';
        
        const input = document.createElement('input');
        input.type = config.type;
        input.placeholder = config.placeholder;
        input.className = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500';
        input.dataset.param = config.name;
        
        return inputDiv.appendChild(input) && inputDiv;
    });
}

function runExerciseTest(exercise, inputElements) {
    const params = Array.from(inputElements)
        .map(div => div.firstChild)
        .map(input => input.type === 'number' ? Number(input.value) : input.value);
    
    switch (exercise.id) {
        case 1: return saludar(...params);
        case 2: return cuadrado(...params);
        case 3: return esPar(...params);
        case 4: return diaDeLaSemana(...params);
        case 5: return calcularDescuento(...params);
        case 6: return clasificarEdad(...params);
        case 7: return operacion(...params);
        case 8: return notaTexto(...params);
        case 9: return saludoIdioma(...params);
        case 10: return tamañoPalabra(...params);
        default: throw new Error('Ejercicio no encontrado');
    }
}

function formatTestResult(result) {
    if (typeof result === 'boolean') {
        return result ? 'true' : 'false';
    }
    if (result === undefined) {
        return 'undefined';
    }
    if (result === null) {
        return 'null';
    }
    return result.toString();
}

// Inicialización de ejercicios en la página
initializeExercises();
