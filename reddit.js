const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

var dataPath = path.join(__dirname, 'popular-articles.json');
let articlesArr = [];

rp('https://reddit.com/r/popular.json')
  .then(JSONObject => {
    let parsedData = JSON.parse(JSONObject);

    parsedData.data.children.map(item => {
      return (
        articlesArr.push({ URL: item.data.url, title: item.data.title, author: item.data.author })
      );
    });
    fs.appendFileSync(dataPath, JSON.stringify(articlesArr));
  }
);
