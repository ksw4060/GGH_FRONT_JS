const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = () => {
    console.log("로딩되었음")
}

async function handleSignin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)


    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    return response
}

async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log("로그인 버튼 테스트!")
    const response = await fetch(`${backend_base_url}/users/api/token/login/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
        // 로컬 스토리지에 jwt accessToken refreshToken 추가함
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        // 로컬 스토리지에 jwt Token payload를 추가함
        alert("로그인에 성공하였습니다!")
        window.location.replace(`${frontend_base_url}/index.html`)
    } else {
        alert("잘못된 ID혹은 PW를 입력하셨습니다.")
    }
}


async function handleMock() {
    console.log("mock 시작")
    const response = await fetch(`${backend_base_url}/users/mock/`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
        },
        method: 'GET',
    })
}
async function handleLogout() {
    console.log("handleLogout 시작")
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    location.reload()
}
