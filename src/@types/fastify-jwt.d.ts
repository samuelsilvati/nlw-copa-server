import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: String;
      avatarURL: String;
    }
  }
}