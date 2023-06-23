function getMatchPath(url, path) {
  let matchPath = url.pathname.match(new RegExp('^\\/' + path + '\\/(.*)'));
  if (matchPath) {
    return matchPath[1];
  }
  return null;
}

async function handle(req) {
  let url = new URL(req.url);

  /*
  @GET /
  */
  if (url.pathname === '/') {
    return new Response(`Hello World!`);
  }

  /*
  @GET /user/:name
  */
  if (url.pathname.match(/^\/user\//)) {
    let name = getMatchPath(url, 'user');
    return new Response(`Hello ${name}`);
  }

  /*
  @GET /api/v1/json/:name
  */
  if (url.pathname.match(/^\/api\//)) {
    let username = getMatchPath(url, 'api/v1/json');
    const data = {
      user: username,
    };

    const json = JSON.stringify(data, null, 2);

    return new Response(json, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  }

  /*
  @Empty route
  */
  const html = `<html><head><title>Page Not Found</title></head><body>Page not found</body></html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

export default {
  async fetch(req) {
    return handle(req);
  },
};
