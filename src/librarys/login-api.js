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
  // 우리는 회원가입 절차가 없기 때문에 사용자가 로그인을 시도할때, 위의 계정정보와 일치하는지 먼저 판별하고 백엔드로 보내야함.
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
          // api 호출이 잘못되어 불러오지 않는 경우를 대비해 확인하는 콘솔 창
          const errorData = await response.json();
          console.error(`API call failed with status: ${response.status}, Message: ${errorData.message}`);
          throw new Error(`API call failed with status: ${response.status}`);
      }

      const responseData = await response.json();

      return {
          email: mid,
          name: account.name,
          access_token: responseData.accessToken,
          refresh_token: responseData.refreshToken,
          admin: account.admin,
      };

  } catch (error) {
      console.error("Login failed:", error);
      return null;
  }
}

export { userLogin };