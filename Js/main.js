let userName = document.querySelector("form > input[type = text]"),
  form = document.querySelector("form"),
  alerts = document.querySelector(".cont >div > p"),
  res = document.querySelector(".cont > div > .res");
function getRepos() {
  if (userName.value === "") {
    alerts.innerHTML = "Please Enter A User Name";
  } else {
    alerts.innerHTML = '<div id="load"><div>G</div><div>N</div><div>I</div><div>D</div><div>A</div><div>O</div><div>L</div></div>';
    fetch(`https://api.github.com/users/${userName.value}/repos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alerts.innerHTML = "";
        res.innerHTML = "";
        if (data.message) {
          alerts.innerHTML = "User Name Is Not Found";
        } else if (data[0] === undefined) {
          alerts.innerHTML = userName.value + " Hasn't Any Reposotries";
        } else {
          for (let i = 0; i < data.length; i++) {
            let repo = data[i],
              repoCard = document.createElement("div"),
              name = document.createElement("p"),
              buttonsDiv = document.createElement("div"),
              demoLink,
              privacy = document.createElement("p"),
              repoLink = document.createElement("a"),
              showMore = document.createElement("p");
            name.innerText = repo.name;
            privacy.innerText = repo.visibility;
            repoLink.innerText = "To repo";
            repoLink.href = repo.html_url;
            showMore.innerText = "Show More";
            if (repo.has_pages) {
              demoLink = document.createElement("a");
              demoLink.href = `https://${userName.value}.github.io/${repo.name}`;
              demoLink.innerText = "To Demo";
            } else {
              demoLink = document.createElement("p");
              demoLink.innerHTML = "No Demo";
              demoLink.style.cursor = "defult";
            }
            buttonsDiv.append(privacy);
            buttonsDiv.append(repoLink);
            buttonsDiv.append(demoLink);
            buttonsDiv.append(showMore);

            repoCard.append(name);
            repoCard.append(buttonsDiv);
            res.append(repoCard);
          }
        }
      });
  }
}
/*            <div id="load"><div>G</div><div>N</div><div>I</div><div>D</div><div>A</div><div>O</div><div>L</div>
              </div> */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  getRepos();
});
