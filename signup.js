function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
        alert("이미 로그인되었습니다 ! 로그아웃 후 로그인 페이지로 이동해주세요. ")
    }
}

checkLogin()


async function handleSigninButton() {
    const response = handleSignin();
    if ((await response).status == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/login.html`)
    } else {
        alert("비밀번호가 다릅니다 ! ")
    }
}
