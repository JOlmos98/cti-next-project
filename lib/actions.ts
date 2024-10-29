"use server";

import prisma from "@/lib/prisma";

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
export async function updateUser(id:number,data:FormData){
    const name=data.get("name") as string|undefined;
    const calefaccionOffset=parseFloat(data.get("calefaccionOffset") as string) || 0;
    const calefaccionMinima=parseFloat(data.get("calefaccionMinima") as string) || 1;
    const calefaccionMaxima=parseFloat(data.get("calefaccionMaxima") as string) || 100;
    const rango=parseFloat(data.get("rango") as string) || 10;

    if (!name){
        throw new Error("El nombre es obligatorio");
    }

    await prisma.user.update({
        where:{
            id,
        },
        data:{
            name,
            calefaccionOffset,
            calefaccionMinima,
            calefaccionMaxima,
            rango,
        },
    });

    return {success:true};
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