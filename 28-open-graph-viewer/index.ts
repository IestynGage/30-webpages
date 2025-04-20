const server = Bun.serve({
  routes: {
    "/api/graph": {
      POST: async req => {
        const body = await req.json();
        console.log(body);
        if ((body as any).url) {
          const htmlText = await fetch((body as any).url)
            .then(res => res.text());
            return Response.json({ htmlText: htmlText}, { 
              status: 200 , 
              headers : { 
                "Access-Control-Allow-Origin": "*"
              }
            });
        }

        return new Response("Not Found", 
          { 
            status: 400 , 
            headers : { 
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      },
    },
  },

  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);