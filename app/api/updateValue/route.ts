// app/api/updateValue/route.ts
import { NextResponse } from 'next/server';
import { updateUser } from '@/lib/actions';

export async function POST(request: Request) {
    const formData = await request.formData();
    const userId = parseInt(formData.get("userId")?.toString() || "0");
    const parameter = formData.get("parameter")?.toString();
    
    console.log("1. Parameter es:", parameter, "y formData es:", formData);
    // Asegurarse de que el valor se obtenga correctamente
    const newValue = parseFloat(formData.get(parameter || "")?.toString() || "0");

    if (isNaN(newValue) || isNaN(userId)) {
        console.log(formData);
        return NextResponse.json({ error: "El valor o el ID de usuario no son válidos." }, { status: 400 });
    }

    //console.log("2. Parameter es:", parameter, "y formData es:", formData);
    try {
        // No es necesario volver a construir el FormData aquí si ya tienes el parámetro
        const formDataToUpdate = new FormData();
        formDataToUpdate.append(parameter || "", newValue.toString());
        console.log("formDataToUpdate", formDataToUpdate);
        //console.log("3. Parameter es:", parameter, "y formData es:", formData);
        // Actualizar el usuario con los valores adecuados
        await updateUser(userId, formDataToUpdate);
        
        const redirectUrl = `http://localhost:3000/userData?userId=${userId}`;
        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        console.log("Error en api/updateValue/route.ts: Error al actualizar el valor.", error, userId, parameter, newValue, typeof newValue, );
        const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
        return NextResponse.json({ error: "Error al actualizar el valor." + errorMessage, userId, parameter, newValue }, { status: 500 });
    }
    
}

