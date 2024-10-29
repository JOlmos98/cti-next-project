// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient(); --- Así es como ponía en la documentación, pero parece que funciona exactamente igual si usamos let como está en la siguiente línea.
let prisma: PrismaClient;

//Todas estas lineas de abajo excepto "expor default prisma" son un copy-paste del ejemplo de prisma-server-actions.
declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
//Hasta aquí.

export default prisma;





















/* APUNTES para API:
Este archivo era necesario para el pages/api/verifyUserId.ts donde 
usamos estas dos lineas:

import prisma from "../../lib/prisma";

y 

const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });
*/