console.log("index.js loading...");

function articleDetail(article_id) {
  window.location.href = `${frontend_base_url}/article_detail.html?article_id=${article_id}`;
}

window.onload = async function loadArticles() {
  // 게시글 전체 리스트를 가져오는 getArticles
  articles = await getArticles();
  console.log(articles); // 콘솔로그를 확인하면, 게시글 전체 리스트가 나온다
  // 게시글 전체에 대한 변수 지정
  const article_list = document.getElementById("article-list");
  //게시글 전체 리스트 안에 있는, 각 게시글들에 대해서 속성 지정
  articles.forEach((article) => {
    const newColumn = document.createElement("div");
    newColumn.setAttribute("class", "col col-sm-1 col-md-4");
    newColumn.setAttribute("onclick", `articleDetail(${article.id})`);

    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card mb-5");
    newCard.setAttribute("id", article.id);
    newCard.style.width = "95%";

    newColumn.appendChild(newCard);

    const articleImage = document.createElement("img");
    articleImage.setAttribute("class", "card-img-top img-fluid");

    if (article.uploaded_image) {
      articleImage.setAttribute(
        "src",
        `${backend_base_url}${article.uploaded_image}`
      ); // "/articles/media/img/2023/9/19/1th%20article%20updated/007272d724e745d3954a1c970a04bf6e_1th_ar_8UzbKe4.JPG"
    } else {
      articleImage.setAttribute(
        "src",
        "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
      );
    }
    newCard.appendChild(articleImage);

    const newCardBody = document.createElement("div");
    newCardBody.setAttribute("class", "card-body");
    newCard.appendChild(newCardBody);

    const newCardTitle = document.createElement("h5");
    newCardTitle.setAttribute("class", "card-title");
    newCardTitle.innerText = article.title;
    newCardBody.appendChild(newCardTitle);

    const newCardContent = document.createElement("p");
    newCardContent.setAttribute("class", "card-text");
    newCardContent.innerText = article.content;
    newCardBody.appendChild(newCardContent);

    article_list.appendChild(newColumn);
  });
};
