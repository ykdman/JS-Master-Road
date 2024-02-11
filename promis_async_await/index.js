// new Promise((resolve, reject) => {
//   let tError = new Error("에러발생!!!");
//   tError.name = "Test Error";
//   throw tError;
// }).catch((error) => {
//   console.log(error);
// });

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/Violet-Bora-Lee",
  "https://api.github.com/users/jeresig",
];

let requests = urls.map((url) => fetch(url));

Promise.all(requests)
  .then((responses) => {
    responses.forEach((response) =>
      console.log(`${response.url} : ${response.status}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });

async function loadJson(url) {
  let response = await fetch(url);
  let 
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson("no-such-user.json").catch(alert); // Error: 404
