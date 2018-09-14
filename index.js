import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const seachInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
  const searchTerm = seachInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const limit = document.getElementById('limit').value;

  //validation

  if(searchTerm == '') {
    showMessage('Please enter a search term', 'alert-danger');
  }

  seachInput.value = '';
  reddit.search(searchTerm, limit, sortBy)
    .then(res => {
      let output = '<div class="card-columns">';
      res.forEach(post => {
        const img = post.preview ? post.preview.images[0].source.url : 'https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/012011/reddit-logo2.png?itok=Jy9FhN43'
        output += `
          <div class="card">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href="${post.url}" class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
          </div>
        `;
      });
      output += '</div>';
      document.getElementById('results').innerHTML = output;
    });

  e.preventDefault();
});

function showMessage(msg, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search');
  searchContainer.insertBefore(div, search);
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) {
    return text;
  }
  return text.substring(0, shortened);
}