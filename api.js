const frontend_base_url = "http://127.0.0.1:5500";
const backend_base_url = "http://127.0.0.1:8000";

console.log("api.js 로드..");

async function handleSignin() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password, username);

  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
  return response;
}

async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("로그인 버튼 테스트!");
  const response = await fetch(`${backend_base_url}/users/api/token/login/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.status == 200) {
    const response_json = await response.json();
    console.log(response_json);
    // 로컬 스토리지에 jwt accessToken refreshToken 추가함
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    localStorage.setItem("payload", jsonPayload);
    // 로컬 스토리지에 jwt Token payload를 추가함
    alert("로그인에 성공하였습니다!");
    window.location.replace(`${frontend_base_url}/index.html`);
  } else {
    alert("잘못된 ID혹은 PW를 입력하셨습니다.");
  }
}

async function handleMock() {
  console.log("mock 시작");
  const response = await fetch(`${backend_base_url}/users/mock/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
}
async function handleLogout() {
  console.log("handleLogout 시작");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  location.reload();
}

async function getArticles() {
  const response = await fetch(`${backend_base_url}/articles/`);

  if (response.status == 200) {
    const response_json = await response.json();
    return response_json;
  } else {
    alert("게시글을 불러오는데 실패 했습니다");
  }
}

async function postArticle() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  // id 를 content로 안두고, text로 둬서 Promise : null 에러뜸.
  const uploaded_image = document.getElementById("uploaded_image").files[0];
  console.log("게시글 POST 테스트!");

  const formdata = new FormData();

  formdata.append("title", title);
  formdata.append("content", content);
  formdata.append("uploaded_image", uploaded_image);

  let token = localStorage.getItem("access");

  const response = await fetch(`${backend_base_url}/articles/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  });

  if (response.status == 201) {
    alert("Article POST 성공!");
    window.location.replace(`${frontend_base_url}/`);
  } else {
    alert(`${response.status}!, 잘못된 게시글 생성 요청입니다!`);
  }
}

async function getArticle(articleId) {
  const response = await fetch(`${backend_base_url}/articles/${articleId}/`);

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(`${response.status}! 게시글을 가져오지 못했습니다!`);
  }
}

async function getComments(articleId) {
  const response = await fetch(
    `${backend_base_url}/articles/${articleId}/comment/`
  );

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(`${response.status}! 댓글들을 가져오지 못했습니다!`);
  }
}
