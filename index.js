var axios = require('axios');
var fs = require('fs');
var path = require('path');
var urls = fs.readFileSync(path.resolve(__dirname, './urls.txt'), 'utf8');

var config = {
  site: "<site>",
  token: "<token>"
}

const url = `http://data.zz.baidu.com/urls?site=${config.site}&token=${config.token}`;

const sendRequest = () => {
  axios.post(url, urls, {
    headers: {
      'Content-Type': 'text/plain'
    },
    body: urls
  }).then(res => {
    const { data } = res;
    const { remain, success } = data;
    if (remain > 4000000 && success > 0) {
      console.log(`remain count ${remain}`)
      sendRequest();
    } else {
      console.log(`finished !`)
    }
  }).catch(reason => {
    console.log(reason);
  })
}


sendRequest();
