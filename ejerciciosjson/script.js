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