const postTemplate = document.getElementById("single-post");
const listPostElement = document.querySelector(".posts");
const createPostForm = document.querySelector("#new-post form");
const fetchBtn = document.querySelector("#available-posts button");

const postUrl = "https://jsonplaceholder.typicode.com/posts";

function sendHttpPostRequest(method = "GET", url = postUrl, data) {
  // const postFetchPromis = new Promise((resolve, reject) => {
  //   const xhrObj = new XMLHttpRequest();

  //   xhrObj.responseType = "json";
  //   // response type 을 json 형식으로 받는것으로 정의
  //   // JSON.parse 사용시, 텍스트 형식으로 오는 response 를 JSON 형식으로 파싱
  //   xhrObj.open(method, url);
  //   xhrObj.send(JSON.stringify(data));

  //   xhrObj.onload = function () {
  //     if (xhrObj.status >= 200 && xhrObj.status < 300) {
  //       resolve(xhrObj.response);
  //     } else {
  //       reject(new Error("Something Went Wrong !!!"));
  //     }
  //   };
  // });
  // return postFetchPromis;
  // // Promise 객체 반환
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      response.json().then((errorData) => {
        console.log(errorData);
        throw new Error("Something Went Wrong - server-side");
      });
    }
  });
}

function fetchPosts() {
  sendHttpPostRequest("GET", postUrl)
    .then((responseData) => {
      for (const post of responseData) {
        const postElement = document.importNode(postTemplate.content, true);
        postElement.querySelector("h2").textContent = post.title.toUpperCase();
        postElement.querySelector("p").textContent = post.body;
        postElement.querySelector("li").id = post.id;
        listPostElement.append(postElement);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title,
    body: content,
    userId,
  };

  sendHttpPostRequest("POST", postUrl, post);
}

fetchBtn.addEventListener("click", fetchPosts);
createPostForm.addEventListener("submit", (event) => {
  event.preventDefault(); // 리 렌더링 저지
  const newPostTitle = event.target.querySelector("#title").value;
  const newPostContent = event.target.querySelector("#content").value;

  if (!newPostTitle || !newPostContent) {
    return;
  }

  createPost(newPostTitle, newPostContent);
});

listPostElement.addEventListener("click", (event) => {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.className === "del-btn"
  ) {
    let delPostId = event.target.closest("li").id;
    sendHttpPostRequest("DELETE", `${postUrl}/${delPostId}`);
  }
});
