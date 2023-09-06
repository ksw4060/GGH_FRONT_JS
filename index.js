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
    intro.innerText = payload_parse.email
}
