console.log("index.js loading...");

window.onload = async function loadArticles() {
  articles = await getArticles();
  console.log(articles);

  const article_list = document.getElementById("article-list");
  articles.forEach((article) => {
    const newColumn = document.createElement("div");
    newColumn.setAttribute("class", "col col-sm-1 col-md-4");

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
