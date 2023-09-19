async function injectNavbar() {
  //   fetch("./navbar.html") //
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((data) => {
  //       document.querySelector("header").innerHTML = data;
  //     });

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

    console.log("로그인 버튼 Hide");
    let loginButton = document.getElementById("login-button");
    loginButton.style.display = "none";
    // 로그아웃 버튼을 ul 안에 li 로 생성
    let navberULRight = document.getElementById("navbar-right");
    let newLi = document.createElement("li");
    newLi.setAttribute("class", "nav-item");
    let logOutBtn = document.createElement("button");
    logOutBtn.setAttribute("class", "navbar-link btn");
    logOutBtn.setAttribute("id", "logout-button");
    logOutBtn.innerText = "로그아웃";
    logOutBtn.setAttribute("onclick", "handleLogout()");

    newLi.appendChild(logOutBtn);
    navberULRight.appendChild(newLi);

    // let logoutButton = document.getElementById("")
  } else {
    console.log("로그인 버튼 Block");
  }
}

injectNavbar();
