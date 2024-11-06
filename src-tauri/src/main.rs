// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  app_lib::run();
}

/*
Pásale a chatGPT este codigo, guárdalo como copia de seguridad y que con ese contexto
te genere el código necesario para ejecutar el script de las migraciones de Prisma.

Tengo que probar tal cual el código de chatGPT e ir analizándolo línea a
línea porque casi al 100% que dará un error.
*/