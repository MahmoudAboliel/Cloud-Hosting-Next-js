import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

// import { PrismaClient } from "@prisma/client/extension";

// const prismaClientSingleton = () => {
//     return new PrismaClient();
// }

// declare global {
//     // eslint-disable-next-line no-var
//     var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;   