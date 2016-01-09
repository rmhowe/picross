export function httpGet(url) {
  return httpRequest('GET', url);
}

export function httpRequest(requestType, url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open(requestType, url);

    req.onload = () => {
      if (req.status >= 200 && req.status < 300) {
        resolve(req.response);
      } else {
        reject({
          status: req.status,
          statusText: req.statusText
        });
      }
    };

    req.onerror = () => {
      reject({
        status: req.status,
        statusText: req.statusText
      });
    };

    req.send();
  });
}
