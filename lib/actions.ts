"use server";

import prisma from "@/lib/prisma";

// Método para VERIFICAR si existe el usuario: //
export async function findUserById(userId: number) {
    try {
        return await prisma.user.findUnique({
            where: { id: userId },
        });
    } catch (error) {
        alert("Error al encontrar el usuario: " + error);
        console.error("Error al encontrar el usuario:", error);
        throw new Error("Error al encontrar el usuario");
    } 
}

// alert("Usuario correcto: " + userId);

// Nueva función en actions.ts
// Método para obtener los DATOS del usuario: //
export async function getUserAndConfigData(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { configs: true }, // Incluye las configuraciones del usuario
    });

    if (!user) {
        throw new Error("Usuario no encontrado.");
    }

    return user;
}


// Método de CREATE: //
export async function createUser(data:FormData){
    const name=data.get("name") as string;
    /*const calefaccionOffset = parseFloat(data.get("calefaccionOffset") as string) || 0;
    const calefaccionMinima = parseFloat(data.get("calefaccionMinima") as string) || 1;
    const calefaccionMaxima = parseFloat(data.get("calefaccionMaxima") as string) || 100;
    const rango = parseFloat(data.get("rango") as string) || 10;*/
    //Esto es por si queremos dar la opción de crear un usuario estableciendo los parámetros,
    //pero mejor lo dejamos solo con el nombre para simplificar.

    if (!name){
        throw new Error("El nombre es obligatorio");
    }

    const user=await prisma.user.create({
        data:{
            name,
        },
    });
    return {success:true};
}

// Método de DELETE: //
export async function deleteUser(id:number){ //El string daba el error, es number.
    await prisma.user.delete({
        where:{
            id,
        },
    });
    return {success:true}
}

// Método de UPDATE: //
export async function updateUser(id: number, data: FormData) {
    console.log("FormData en updateUser:", Array.from(data.entries()));
    
    // Obtener todos los pares clave-valor del FormData
    const entries = Array.from(data.entries());
    const updateData: { [key: string]: number } = {};
    
    // Procesar cada entrada del FormData
    for (const [parameterName, valueString] of entries) {
        // Convertir el valor a número
        const value = parseFloat(valueString as string);
        
        // Logs para debugging
        console.log({
            parameterName,
            rawValue: valueString,
            parsedValue: value
        });
        
        // Verificar si el valor es válido
        if (isNaN(value)) {
            console.log(`Error en lib/actions.ts: El valor proporcionado para ${parameterName} no es un número válido.`);
            throw new Error(`Error en lib/actions.ts: El valor proporcionado para ${parameterName} no es un número válido.`);
        }
        
        // Añadir al objeto de actualización
        updateData[parameterName] = value;
    }
    
    // Verificar si hay datos para actualizar
    if (Object.keys(updateData).length === 0) {
        console.log("Error: No hay datos para actualizar");
        throw new Error("No hay datos para actualizar");
    }
    
    // Realizar la actualización en la base de datos
    try {
        await prisma.user.update({
            where: { id },
            data: updateData,
        });
        
        return { success: true };
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        throw new Error("Error al actualizar el usuario en la base de datos");
    }
}

/*
model User {
    id                   Int      @id @default(autoincrement())
    name                 String
    calefaccionOffset    Float    @default(0) // Offset Temperatura en ºC
    calefaccionMinima    Float    @default(1) // Calefacción mínima en %
    calefaccionMaxima    Float    @default(100) // Calefacción máxima en %
    rango                Float    @default(10) // Rango en ºC
    configs              Config[] // Relación uno a muchos con Config, esto se cambiaría y cada usuario solo tiene una configuración.
  }
    */