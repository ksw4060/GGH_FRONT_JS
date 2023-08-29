const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = () => {
    console.log("로딩되었음")
}

async function handleSignin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)


    const reponse = await fetch("`${backend_base_url}`/user/signup/", {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    if (reponse.status == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace("`${frontend_base_url}`/login.html")

    }
}

async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const reponse = await fetch('`${backend_base_url}`/user/api/token', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    const reponse_json = await reponse.json()
    console.log(reponse_json)
    localStorage.setItem("access", reponse_json.access);
    localStorage.setItem("refresh", reponse_json.refresh);
}
