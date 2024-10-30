
export default async function Home() {

  // La función handleSubmit ya no es necesaria aquí
  // porque se manejará directamente en el endpoint

  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center m-5 font-[family-name:var(--font-geist-sans)]">
      <h1 className="flex p-3 gap-6 rounded-3xl text-8xl">CTIcontrol</h1>
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <span className="flex text-3xl">Bienvenido a la interfaz de usuario de [insertar nombre de hardware].</span>
        <span className="flex text-3xl">Introduce tu número de usuario:</span>
        <form action="/api/users" method="POST" className="flex justify-center m-2">
          <input 
            type="text" 
            name="userId"
            className="text-black block mx-auto p-1 rounded-3xl border-slate-700 border-2" 
            id="userId" 
            placeholder="Inserta tu número de usuario" 
            required 
          />
          <br />
          <button type="submit" className="flex bg-blue-300 bg-opacity-30 p-4 mx-auto rounded-3xl text-3xl">Log in</button>
        </form>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4 justify-center">
            <a className="flex bg-blue-300 bg-opacity-30 p-5 m-0 rounded-3xl text-5xl" href="/howtouse">How To Use</a>
            <a className="flex bg-blue-300 bg-opacity-30 p-5 m-0 rounded-3xl text-5xl" href="/pricing">Pricing</a>
            <a className="flex bg-blue-300 bg-opacity-30 p-5 m-0 rounded-3xl text-5xl" href="/contact">Contact</a>
          </div>
          <div>
            <img src="/Logo-CTI-png.png" alt="Logo CTIcontrol" className="h-32 w-auto ml-40" />
          </div>
        </div>
      </main>
    </div>
  );
}



/*import { redirect } from "next/navigation";

export default async function Home() {

  const handleSubmit = async (formData: FormData) => {
    const userId = formData.get("userId") as string;

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      redirect(`/userData?userId=${encodeURIComponent(userId)}`);
    } else {
      throw new Error("ID inválido");
    }
  };

    // Utiliza un handler en el servidor
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      const formData = new FormData(event.currentTarget); // Obtener los datos del formulario
      await handleSubmit(formData); // Llamar a handleSubmit
    };

  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center m-5 font-[family-name:var(--font-geist-sans)]">
      <h1 className="flex p-3 gap-6 rounded-3xl text-8xl">CTIcontrol</h1>
      <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
        <span className="flex text-3xl">Bienvenido a la interfaz de usuario de [insertar nombre de hardware].</span>
        <span className="flex text-3xl">Introduce tu número de usuario:</span>
        <form onSubmit={onSubmitHandler} className="flex justify-center w-full">
          <input 
            type="text" 
            name="userId"
            className="text-black block mx-auto p-3 rounded-3xl border-slate-700 border-2" 
            id="userId" 
            placeholder="Inserta tu número de usuario" 
            required 
          />
          <button type="submit" className="flex bg-blue-300 bg-opacity-30 p-4 mx-auto rounded-3xl text-3xl">Log in</button>
        </form>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4 justify-center">
            <a className="flex bg-blue-300 bg-opacity-30 p-5 m-0 rounded-3xl text-5xl" href="/howtouse">How To Use</a>
            <a className="flex bg-blue-300 bg-opacity-30 p-5 m-0 rounded-3xl text-5xl" href="/pricing">Pricing</a>
            <a className="flex bg-blue-300 bg-opacity-30 p-5 m-0 rounded-3xl text-5xl" href="/contact">Contact</a>
          </div>
          <div>
            <img src="/Logo-CTI-png.png" alt="Logo CTIcontrol" className="h-32 w-auto ml-40" />
          </div>
        </div>
      </main>
    </div>
  );
}
  */


//{message && <span className="flex text-3xl">{message}</span>}

/*
  Importamos la librería useRouter de next/router
  y la declaramos como router
  
  Usamos el hook useState para almacenar el usuarioId

  Uso de encodeURIComponent: Esto sigue siendo importante 
  para asegurar que el nombre del usuario se pase correctamente 
  como parámetro en la URL.
*/