// app/changeValue/page.tsx
// app/changeValue/page.tsx
import { CheckIcon, XIcon } from "@primer/octicons-react";

// Componente principal de ChangeValue
export default function ChangeValue({ searchParams }: { searchParams: { parameter: string; userId: string; value: string } }) {
    const { parameter, userId, value } = searchParams;

    // Convertir el valor a número para mostrar en el input
    const numericValue = parseFloat(value) || 0;

    return (
        <div className="flex items-center justify-center pt-60 pb-60 m-auto font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 items-center">
                {/* Formulario que enviará los datos al servidor */}
                <form action="/api/updateValue" method="POST">
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="parameter" value={parameter} />
                    <span className="flex flex-col items-center justify-center gap-3 bg-blue-300 bg-opacity-30 p-5 m-2 rounded-3xl text-center text-2xl">
                        Establece un valor 
                        <br />
                        <input
                            className="text-black p-2 m-2 w-full border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name={parameter}
                            placeholder="Ingresa un valor"
                            defaultValue={numericValue} // Para mostrar el valor inicial
                        />
                        <div className="flex justify-center gap-4">
                            <a href={`/userData?userId=${encodeURIComponent(userId)}`} className="flex bg-blue-600 bg-opacity-30 p-2 rounded-xl">
                                <XIcon size={24} className="p-0 m-2" />
                            </a>
                            <button type="submit" className="flex bg-blue-600 bg-opacity-30 p-2 rounded-xl">
                                <CheckIcon size={24} className="p-0 m-2" />
                            </button>
                        </div>
                    </span>
                </form>
            </main>
        </div>
    );
}


