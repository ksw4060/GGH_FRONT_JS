console.log("index.js loading...")

window.onload = async function loadArticles() {

    articles = await getArticles()
    console.log(articles)
}
