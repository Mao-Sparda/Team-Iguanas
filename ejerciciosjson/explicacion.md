# Tarea: Ejercicios con JSON

Equipo:
CARLOS ALEJANDRO ACOSTA MENDEZ
RUBEN HORACIO MACHUCA SANTOS
VALERIA DE LOS ANGELES CRUZ MAY 
KEVIN JOSEFP HUERTA MORENO



## Descripción
Se generó un conjunto de 200 datos usando [Mockaroo](https://www.mockaroo.com/).  

Los campos definidos fueron:

- `id` (Numero)  
- `first_name` (Nombre)  
- `last_name` (Apellido)  
- `gender` (Genero: "M" o "F")  
- `estado` (Estado: Yucatan, Campeche, Chiapas, Tabasco)  
- `carrera` (Carrera: ISC, ICO, ITCC, IDM)

Al filtrar se muestran los resultados impresos en la consola del navegador.
---

## Explicacion de Cada Bloque

**Carga de Datos:**
- `fetch('datos.json')` solicita el archivo JSON generado en Mockaroo.  
- `await respuesta.json()` convierte la respuesta en un objeto JavaScript.  
- `console.log(datos)` muestra los 200 alumnos en consola.  

**Ejemplo de salida parcial:**
```json
[
  { "id": 1, "first_name": "Juan", "last_name": "Perez", "gender": "M", "estado": "Yucatan", "carrera": "ISC" },
  { "id": 2, "first_name": "Maria", "last_name": "Lopez", "gender": "F", "estado": "Chiapas", "carrera": "IDM" }
]
```

**Parte A: Alumnos de IDM:**  

- Filtra alumnos cuya `carrera` sea `"IDM"`.  
- `JSON.stringify(..., null, 2)` convierte el arreglo en JSON legible.  

```json
const alumnosIDM = datos.filter(alumno => {
        return alumno.carrera === 'IDM';
    });
    console.log(alumnosIDM);
    console.log('--- JSON de Alumnos de IDM ---');
    console.log(JSON.stringify(alumnosIDM, null, 2));
```

Ejemplo de salida parcial:
```json
[
  { "id": 2, "first_name": "Maria", "last_name": "Lopez", "gender": "F", "estado": "Chiapas", "carrera": "IDM" },
  { "id": 15, "first_name": "Carlos", "last_name": "Gomez", "gender": "M", "estado": "Tabasco", "carrera": "IDM" }
]
```

**Parte B: Alumnos de ISC de Yucatan:**  
- Filtra alumnos que tengan `carrera` `"ISC"` y `estado` `"Yucatan"`.  
```json
const alumnosISC_Yucatan = datos.filter(alumno => {
        return alumno.carrera === 'ISC' && alumno.estado === 'Yucatan';
    });
    console.log('--- Alumnos de ISC de Yucatan (JSON) ---');
    console.log(JSON.stringify(alumnosISC_Yucatan, null, 2));
```

Ejemplo de salida parcial:
```json
[
  { "id": 1, "first_name": "Juan", "last_name": "Perez", "gender": "M", "estado": "Yucatan", "carrera": "ISC" }
]
```

**PARTE C: Todas las alumnas:**  
- Filtra alumnos con `gender` igual a `"F"`.  

```json
    const alumnas = datos.filter(alumno => {
        return alumno.gender === 'F';
    });
    console.log('--- Todas las alumnas (JSON) ---');
    console.log(JSON.stringify(alumnas, null, 2));
```
Ejemplo de salida parcial:
```json
[
  { "id": 2, "first_name": "Maria", "last_name": "Lopez", "gender": "F", "estado": "Chiapas", "carrera": "IDM" },
  { "id": 7, "first_name": "Ana", "last_name": "Martinez", "gender": "F", "estado": "Campeche", "carrera": "ISC" }
]
```

**Parte D: ID y Nombre Completo:**  
- Transforma cada objeto para mantener solo `id` y `Nombre_Completo` (concatenacion de first_name y last_name).  
```json
    const nombresCompletos = datos.map(alumno => {
      return {
        id: alumno.id, 
        Nombre_Completo: `${alumno.first_name} ${alumno.last_name}`
      };
    });
    console.log('--- Lista de Nombres Completos (JSON) ---');
    console.log(JSON.stringify(nombresCompletos, null, 2));
```

Ejemplo de salida parcial:
```json
[
  { "id": 1, "Nombre_Completo": "Juan Perez" },
  { "id": 2, "Nombre_Completo": "Maria Lopez" }
]
```

Este código permite cargar y mostrar todos los datos, filtrar por carrera y estado, filtrar por género y transformar los datos para mostrar solo campos específicos, generando diferentes vistas de los datos en formato JSON legible.

Codigo completo: script.js

```json
async function cargarDatos() {
    const respuesta = await fetch('datos.json');
    const datos = await respuesta.json();
    
    console.log(datos); 

    // --- Parte A Alumnos de IDM ---
    const alumnosIDM = datos.filter(alumno => {
        return alumno.carrera === 'IDM';
    });
    console.log(alumnosIDM);
    console.log('--- JSON de Alumnos de IDM ---');
    console.log(JSON.stringify(alumnosIDM, null, 2));

    
    // --- Parte B Alumnos de ISC de Yucatan ---
    const alumnosISC_Yucatan = datos.filter(alumno => {
        return alumno.carrera === 'ISC' && alumno.estado === 'Yucatan';
    });
    console.log('--- Alumnos de ISC de Yucatan (JSON) ---');
    console.log(JSON.stringify(alumnosISC_Yucatan, null, 2));

    
    // --- Parte C Todas las alumnas
    const alumnas = datos.filter(alumno => {
        return alumno.gender === 'F';
    });
    console.log('--- Todas las alumnas (JSON) ---');
    console.log(JSON.stringify(alumnas, null, 2));

    
    // --- Parte D ID y Nombre Completo ---
    const nombresCompletos = datos.map(alumno => {
      return {
        id: alumno.id, 
        Nombre_Completo: `${alumno.first_name} ${alumno.last_name}`
      };
    });
    console.log('--- Lista de Nombres Completos (JSON) ---');
    console.log(JSON.stringify(nombresCompletos, null, 2));

    
} 
cargarDatos();
```


Codigo completo: index.html

```json
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tarea JSON</title>
</head>
<body>
    <h1>Resultados en la Consola</h1>
    <p>Abre la consola del navegador (con F12) para ver los resultados.</p>

    <script src="script.js"></script>
</body>
</html>
```