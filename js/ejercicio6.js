// Ejercicio 6: Función Clasificar Edad
// Instrucciones:
// 1. Crea una función llamada `clasificarEdad` que tome un parámetro `edad`.
// 2. Usa if/else o switch para retornar:
//    - "Niño" si la edad es menor de 12
//    - "Adolescente" si la edad está entre 13 y 17
//    - "Adulto" si la edad es 18 o mayor
// 3. Por ejemplo: clasificarEdad(15) debe retornar "Adolescente"

// Escribe tu código aquí debajo:
function clasificarEdad (edad){
    if(edad >=0 && edad <=12){
        return "Niño"
    }else if(edad >=13 && edad <=17){
        return "Adolescente"
    }else if(edad >=18){
        return "Adulto"
    }
}