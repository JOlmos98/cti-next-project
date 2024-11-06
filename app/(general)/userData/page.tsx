// app/userData/page.tsx

import { getUserAndConfigData } from "@/lib/actions";
import { PencilIcon } from "@primer/octicons-react";
import { notFound } from "next/navigation";
//import { Config } from "tailwindcss";

type UserDataProps = {
    searchParams: { userId: string };
};

export default async function UserData({ searchParams }: UserDataProps) {
    // Espera a que searchParams se resuelva
    const { userId } = await searchParams;

    // Procesa userId después de asegurarte de que está disponible
    const parsedUserId = userId ? parseInt(userId, 10) : 0;

    if (isNaN(parsedUserId)) {
        return notFound(); // Mostrar una página de error si no hay un userId válido
    }

    // Llamada del lado del servidor para obtener los datos del usuario
    let userData;
    try {
        userData = await getUserAndConfigData(parsedUserId);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
        return <div>Error: {errorMessage}</div>;
    }

    type UserParameters = 'calefaccionOffset' | 'calefaccionMinima' | 'calefaccionMaxima' | 'rango';

    const handleEditUrl = (parameter: UserParameters) => {
        const value = userData[parameter]; // Se puede acceder sin error de tipo
        return `/changeValue?parameter=${encodeURIComponent(parameter)}&userId=${encodeURIComponent(userData.id)}&value=${encodeURIComponent(value)}`;
    };
    
    
    return (
        <div className="grid grid-rows-[1fr_auto] items-center gap-14 justify-items-center m-auto font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-14 row-start-2 items-center sm:items-start">
                <span className="flex bg-blue-300 bg-opacity-30 rounded-3xl p-4 m-auto gap-8 text-5xl">
                    Bienvenido/a {userData.name}.
                </span>
                
                <div className="flex flex-col bg-blue-100 bg-opacity-70 p-8 m-1 rounded-3xl shadow-lg w-[768px]">
                    <h2 className="text-4xl mb-6 font-semibold text-blue-900">Datos del Usuario</h2>
    
                    <table className="table-auto w-full text-left text-blue-800">
                        <tbody>
                            <tr className="border-b-2 border-gray-500">
                                <td className="p-2 font-medium text-xl">Calefacción Offset:</td>
                                <td className="p-1 text-xl">{userData.calefaccionOffset}</td>
                                <td className="p-0 text-xl">Cº</td>
                                <td>
                                    <a href={handleEditUrl('calefaccionOffset')} className="flex items-center justify-center bg-blue-600 bg-opacity-30 p-2 mx-auto w-10 rounded-xl text-1xl">
                                        <PencilIcon className="m-0"/>
                                    </a>
                                </td>
                            </tr>
                            <tr className="border-b-2 border-gray-500">
                                <td className="p-2 font-medium text-xl">Calefacción Mínima:</td>
                                <td className="p-1 text-xl">{userData.calefaccionMinima}</td>
                                <td className="p-0 text-xl">%</td>
                                <td>
                                    <a href={handleEditUrl('calefaccionMinima')} className="flex items-center justify-center bg-blue-600 bg-opacity-30 p-2 mx-auto w-10 rounded-xl text-1xl">
                                        <PencilIcon className="m-0"/>
                                    </a>
                                </td>
                            </tr>
                            <tr className="border-b-2 border-gray-500">
                                <td className="p-2 font-medium text-xl">Calefacción Máxima:</td>
                                <td className="p-1 text-xl">{userData.calefaccionMaxima}</td>
                                <td className="p-0 text-xl">%</td>
                                <td>
                                    <a href={handleEditUrl('calefaccionMaxima')} className="flex items-center justify-center bg-blue-600 bg-opacity-30 p-2 mx-auto w-10 rounded-xl text-1xl">
                                        <PencilIcon className="mr-0"/>
                                    </a>
                                </td>
                            </tr>
                            <tr className="border-b-2 border-gray-500">
                                <td className="p-2 font-medium text-xl">Rango:</td>
                                <td className="p-1 text-xl">{userData.rango}</td>
                                <td className="p-0 text-xl">Cº</td>
                                <td>
                                    <a href={handleEditUrl('rango')} className="flex items-center justify-center bg-blue-600 bg-opacity-30 p-2 mx-auto w-10 rounded-xl text-1xl">
                                        <PencilIcon className="m-0"/>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                    <h2 className="text-2xl mt-8 mb-4 font-semibold text-blue-900">Configuraciones:</h2>
    
                    {userData.configs && userData.configs.length > 0 ? (
                        <ul className="list-disc pl-8 text-blue-800">

                        </ul>
                    ) : (
                        <p className="text-left text-blue-600">No hay configuraciones disponibles.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

/* Esto va dentro de ul

                            {userData.configs.map((config: ) => (
                                <li key={config.id} className="py-1">
                                    {JSON.stringify(config)}
                                </li>
                            ))}

*/