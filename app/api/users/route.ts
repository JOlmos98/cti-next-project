import prisma from "@/lib/prisma";

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
