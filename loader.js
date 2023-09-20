async function injectNavbar() {
  let navbarHtml = await fetch("./navbar.html");
  let data = await navbarHtml.text();
  document.querySelector("header").innerHTML = data;

  const payload = localStorage.getItem("payload");
  if (payload) {
    const payload_parse = JSON.parse(payload);
    const intro = document.getElementById("intro");
    intro.innerText = `${payload_parse.username}님 안녕하세요!`;
    // 1. 로그인 성공 시, 로그인 버튼을 숨기고 로그아웃 버튼을 생성한다.
    // 2. 로그인 X, 로그인 버튼을 유지하고 굳이 로그아웃 버튼이 생성되지 않는다

    // 로그인 버튼 숨기기
    let loginButton = document.getElementById("login-button");
    loginButton.style.display = "none";
    // 회원가입 버튼 숨기기
    let signUpButton = document.getElementById("signup-button");
    signUpButton.style.display = "none";

    // 게시글 작성 버튼을 ul 안에 li 로 생성
    let navberLeftUl = document.getElementById("navbar-left");
    let articleCreateLi = document.createElement("li");
    articleCreateLi.setAttribute("class", "nav-item");
    // 로그인 시, 게시글 작성하기 버튼을 활성화
    let articleCreateLink = document.createElement("a");
    articleCreateLink.setAttribute("class", "nav-link active btn");
    articleCreateLink.setAttribute("id", "article-create-link");
    articleCreateLink.setAttribute("href", "/article_create.html");
    articleCreateLink.innerText = "게시글 작성하기";

    // 네비바 오른쪽 ul , li 변수명 지정
    let navberRightUl = document.getElementById("navbar-right");
    let newRightLi = document.createElement("li");
    newRightLi.setAttribute("class", "nav-item");

    // 로그아웃 버튼 속성 지정
    let logOutBtn = document.createElement("button");
    logOutBtn.setAttribute("class", "navbar-link btn");
    logOutBtn.setAttribute("id", "logout-button");
    logOutBtn.innerText = "로그아웃";
    logOutBtn.setAttribute("onclick", "handleLogout()");

    newRightLi.appendChild(logOutBtn); // navbar 오른쪽 li 에 로그아웃 버튼 추가
    navberRightUl.appendChild(newRightLi); // navbar 오른쪽 ul 에 li 추가
    articleCreateLi.appendChild(articleCreateLink); // navbar 왼쪽 li 에 게시글작성 버튼 추가
    navberLeftUl.appendChild(articleCreateLi); // navbar 왼쪽 ul 에 li 추가

    // let logoutButton = document.getElementById("")
  } else {
    console.log("로그인 버튼 Block");
  }
}

injectNavbar();
