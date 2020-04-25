export default function Request(url) {
  this.pollTimer = null;
  this.interval = 3000;
  this.url = `${url}/all-messages`;
}

Request.prototype.disablePoll = function() {
  clearInterval(this.pollTimer);
  this.pollTimer = null;
};

Request.prototype.activatePoll = function(cb) {
  const url = this.url;

  this.pollTimer = setInterval(function() {
    fetch(url)
      .then((response) => response.json())
      .then(({ data }) => cb && cb(data));
  }, this.interval);
};
