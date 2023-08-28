export async function userLogin(id, password) {
  const accounts = [
    {
      id: "admin@example.com",
      password: "qwerty123",
      name: "관리자",
      admin: true,
    },
    {
      id: "user@example.com",
      password: "qwerty123",
      name:"일반유저",
      admin: false,
    },
  ];

  const account = accounts.find((item) => item.id === id);
  if (!account) {
    return null;
  }
  if (account.password !== password) {
    return null;
  }
  return {
    email: account.id,
    name: account.name,
    access_token: "token1",
    refresh_token: "token2",
    admin: account.admin,
  };
}