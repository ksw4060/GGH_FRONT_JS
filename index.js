console.log("index.js 가 잘 로딩 되었습니다.")


fetch("./navbar.html").then(response => {
    return response.text()
})
    .then(data => {
        document.querySelector("header").innerHTML = data;
        // 1. header 라는 속성에 innerHTML 에 먼저 navbar.html 코드(데이터)를 담아주고
        buttonBlockAndHide();
        // 2. 아래의 buttonBlockAndHide 함수를 순차적으로 실행한다.
    })


const buttonBlockAndHide = () => {
    // 페이로드를 로컬스토리지에 저장하고, 페이로드에 있는 사용자 정보를 가져옴

    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload);
    const intro = document.getElementById("intro")
    if (payload) {
        intro.innerText = `${payload_parse.username}님 안녕하세요!`
        // 1. 로그인 성공 시, 로그인 버튼을 숨기고
        // 2. 로그아웃 버튼을 생성한다.
        // 3.

        console.log("로그인 버튼 Hide")
        let loginButton = document.getElementById("login-button")
        loginButton.style.display = "none";
        // 로그아웃 버튼을 ul 안에 li 로 생성
        let navberULRight = document.getElementById("navbar-right")
        let newLi = document.createElement("li")
        newLi.setAttribute("class", 'nav-item')
        let logOutBtn = document.createElement("button")
        logOutBtn.setAttribute("class", 'navbar-link btn')
        logOutBtn.setAttribute("id", "logout-button")
        logOutBtn.innerText = "로그아웃"
        logOutBtn.setAttribute("onclick", "handleLogout()")

        newLi.appendChild(logOutBtn)
        navberULRight.appendChild(newLi)

        // let logoutButton = document.getElementById("")
    } else {
        console.log("로그인 버튼 Block")

    }
}
    // console.log(payload)
    // console.log(typeof payload)
    // console.log(payload_parse)
    // console.log(typeof payload_parse)
    // console.log(payload_parse.email)
    // id가 intro 인 곳에 페이로드에 있는 사용자 이름 payload_parse.username 을 innerText로 저장함.






