window.addEventListener('load', function() {
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  });

  function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=c763804a85dd49e3a98e726fdbd114a2`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
  }

  function handleError() {
    console.log('Se presentó un error.');
  }

  function addNews() {
    const data = JSON.parse(this.responseText);
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');
    li.className = 'card';
    li.innerText = snippet;

    responseContainer.appendChild(li);
  }
});
