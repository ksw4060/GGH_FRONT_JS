console.log("article_datail.js 로드...");

async function loadComments(articleId) {
  const response = await getComments(articleId);
  console.log(response);

  const commentListUl = document.getElementById("comment-list");
  response.forEach((comment) => {
    commentListUl.innerHTML += `
    <li class="media d-flex mb-5 mt-5">
        <img class="mr-3" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="프로필 이미지" width=60;, height=60;>
        <div class="media-body">
          <h5 class="mt-0 mb-1">${comment.user}</h5>
          <p>댓글 내용 : ${comment.comment}</p>
          <p>해당 게시글 제목 : ${comment.article}</p>
          <p>작성 날짜 : ${comment.created_at}</p>
        </div>
    </li>`;
  });
}

async function loadArticles(articleId) {
  const response = await getArticle(articleId);

  const articleTitle = document.getElementById("article-title");
  const articleImage = document.getElementById("article-image");
  const articleContent = document.getElementById("article-content");

  articleTitle.innerText = response.title;
  articleContent.innerText = response.content;
  const newImage = document.createElement("img");

  if (response.uploaded_image) {
    newImage.setAttribute(
      "src",
      `${backend_base_url}${response.uploaded_image}`
    ); // "/articles/media/img/2023/9/19/1th%20article%20updated/007272d724e745d3954a1c970a04bf6e_1th_ar_8UzbKe4.JPG"
  } else {
    newImage.setAttribute(
      "src",
      "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
    );
  }

  newImage.setAttribute("class", "img-fluid");

  articleImage.appendChild(newImage);
}

window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("article_id");
  console.log(articleId);

  await loadComments(articleId);
  await loadArticles(articleId);
};
