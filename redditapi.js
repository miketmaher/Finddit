export default {
  search: function(term, limit, sortBy) {
    return fetch(`http://www.reddit.com/search.json?q=${term}&sort=${sortBy}&limit=${limit}`)
      .then(res => res.json())
      .then(data => data.data.children.map(data => data.data))
      .catch(err => console.log(err));
  }
}