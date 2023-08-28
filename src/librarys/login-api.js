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

async function userLogin(mid, password) {
  const account = accounts.find(account => account.id === mid && account.password === password);
  
  if (!account) {
      console.error("유효하지 않은 아이디와 비밀번호 입니다.");
      return null;
  }

  const apiUrl = "/login";

  try {
      const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              mid: mid,
              password: password,
          }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error(`API call failed with status: ${response.status}, Message: ${errorData.message}`);
          throw new Error(`API call failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      const loginResult = {
          email: mid,
          name: account.name,
          access_token: responseData.accessToken,
          refresh_token: responseData.refreshToken,
          admin: account.admin,
      };
      
      // localStorage에 사용자 정보 저장
      localStorage.setItem('user', JSON.stringify(loginResult));
      
      return loginResult;

  } catch (error) {
      console.error("Login failed:", error);
      return null;
  }
}

export { userLogin };