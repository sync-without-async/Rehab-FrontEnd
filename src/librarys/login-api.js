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
    name: "일반유저",
    admin: false,
  },
];

export const validateUser = (id, password) => {
  return accounts.find(account => account.id === id && account.password === password);
};

export async function userLogin(id, password) {
  // 서버 URL과 경로
  const apiUrl = 'http://raspberrypihome.iptime.org:8080/login';

  // 서버에 보낼 데이터
  const data = {
    mid: id,
    password: password,
  };

  // API 요청을 보내는 코드
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      // 서버로부터 받은 토큰 정보를 Redux store에 저장할 형태로 변환
      return {
        email: id, // 이메일은 요청한 ID로 설정
        name: id.includes('admin') ? '관리자' : '일반유저', // 이메일에 admin이 포함되어 있다면 이름을 관리자로 설정
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
        admin: id.includes('admin'), // 이메일에 admin이 포함되어 있다면 admin 권한 부여
      };
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('There was an error with the login request:', error);
    return null;
  }
}
