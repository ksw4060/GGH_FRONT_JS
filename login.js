function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
        alert("이미 로그인되었습니다 ! 로그아웃 후 로그인 페이지로 이동해주세요. ")
    }
}

checkLogin()
