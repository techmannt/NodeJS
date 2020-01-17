const path = require('path');
const fs = require('fs');
const rp = require('request-promise');
let articlesArr = [];

rp('https://reddit.com/r/popular.json')
  .then(JSONObject => {
    let parsedData = JSON.parse(JSONObject);

    parsedData.data.children.filter(item => (path.extname(item.data.url) === ".jpg") || (path.extname(item.data.url) === ".gif") || (path.extname(item.data.url) === ".png"))
      .map(item => articlesArr.push({ URL: item.data.url, id: item.data.id }));

    articlesArr.forEach(item => {
      rp(item.URL, { encoding: 'base64' })
        .then(content => {
          fs.writeFile(path.join(__dirname, item.id) + path.extname(item.URL), content, { encoding: "base64" }, (err) => {
            if (err != null) console.log('Error: ', err);  // This will prevent lots of "null" from showing up.
          });
        });
    });
  }
);
