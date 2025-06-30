const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "123456",
    name: "João Silva",
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
  },
];

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  login: async (email: string, password: string) => {
    await delay(1000); // Simula delay de rede

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const token = `fake-jwt-token-${user.id}-${Date.now()}`;
      return {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          token,
        },
      };
    } else {
      throw new Error(
        "Usuário ou senha inválidos, verifique suas credenciais.",
        { cause: 401 }
      );
    }
  },
  validateToken: async (token: string) => {
    await delay(1000); // Simula delay de rede

    if (token && token.startsWith("fake-jwt-token-")) {
      const userId = token.split("-")[3];
      const user = users.find((u) => u.id === parseInt(userId));

      if (user) {
        return {
          success: true,
          data: {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
          },
        };
      }
    }

    throw new Error("Token inválido");
  },
};

export default authService;
