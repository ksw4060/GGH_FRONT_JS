console.log("index.js 가 잘 로딩 되었습니다.")

window.onload = () => {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    // console.log(payload)
    // console.log(typeof payload)
    // console.log(payload_parse)
    // console.log(typeof payload_parse)
    // console.log(payload_parse.email)

    const intro = document.getElementById("intro")
    intro.innerText = `${payload_parse.username}님 안녕하세요!`

    let navberULRight = document.getElementById("navbar-right")
    let newLi = document.createElement("li")
    newLi.setAttribute("class", 'nav-item')
    let logOutBtn = document.createElement("button")
    logOutBtn.setAttribute("class", 'navbar-link btn')

    logOutBtn.innerText = "로그아웃"
    logOutBtn.setAttribute("onclick", "handleLogout()")

    newLi.appendChild(logOutBtn)
    navberULRight.appendChild(newLi)

    let loginButton = document.getElementById("login-button")
    loginButton.style.display = "none";
}
