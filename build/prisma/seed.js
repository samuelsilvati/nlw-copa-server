"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            avatarUrl: 'https://github.com/samuelsilvati.png'
        }
    });
    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });
    await prisma.game.create({
        data: {
            date: "2022-11-05T12:34:00.201Z",
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        },
    });
    await prisma.game.create({
        data: {
            date: "2022-11-07T12:34:00.201Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        },
    });
}
main();
