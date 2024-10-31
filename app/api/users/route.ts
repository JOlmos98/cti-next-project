// app/api/users/route.ts

import { createUser, deleteUser, findUserById } from "@/lib/actions"; 
import { NextResponse } from "next/server";

// /userData?userId=${encodeURIComponent(userId)}
// const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";

// POST: //
export async function POST(req: Request) {
    const formData = await req.formData();
    const userId = formData.get("userId")?.toString();

    if (!userId || isNaN(Number(userId))) {
        return NextResponse.json({ error: "ID de usuario inválido" }, { status: 400 });
    }

    const userIdInt = parseInt(userId, 10);
    try {
        const user = await findUserById(userIdInt);
        if (user) {
            // Modifica esta línea para usar la URL absoluta
            const url = new URL(req.url);
            return NextResponse.redirect(`${url.origin}/userData?userId=${userIdInt}`);
        } else {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error en la búsqueda del usuario:", error);
        const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
        return NextResponse.json({ error: "Error del servidor: " + errorMessage }, { status: 500 });
    }
}

// Método DELETE: Eliminar un usuario //
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const idString = searchParams.get("id");
    const id = parseInt(idString as string, 10);

    if (isNaN(id)) {
        return new Response("ID inválido", { status: 400 });
    }

    try {
        const result = await deleteUser(id);
        return new Response(JSON.stringify(result), { status: 200 }); // Devolver respuesta de éxito
    } catch (error) {
        return new Response("Usuario no encontrado", { status: 404 }); // Manejar el error de usuario no encontrado
    }
}









//Antiguo route.ts sin usar actions y suponiendo que usabamos componentes del lado del cliente en page.tsx, es decir, basura.

/*import prisma from "@/lib/prisma";

// Método POST: //
export async function POST(req: Request) {
    const{name}=await req.json();

    if (!name){
        return new Response("El nombre es obligatorio", {status:400});
    }

    await prisma.user.create({
        data:{
            name,
        
        },
    });
    
    //return {success:true}; JSON.stringify convierte un objeto JavaScript a formato JSON
    //en este caso devolvemos el objeto JS {success:true} en JSON junto con el estado HTTP en un objeto Response.
    //Conclusión, con la línea de abajo proporcionamos información para el cliente.
    return new Response(JSON.stringify({success:true}), {status:201});
}

// Método DELETE: //
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const idString = searchParams.get("id");
    const id = parseInt(idString as string, 10);

    if (isNaN(id)) {
        return new Response("ID inválido", { status: 400 });
    }

    try {
        await prisma.user.delete({
            where: {
                id,
            },
        });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        // Manejo de errores en caso de que el usuario no exista
        return new Response("Usuario no encontrado", { status: 404 });
    }
}
*/