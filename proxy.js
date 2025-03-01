const http = require("http");
const { createServer } = require("http-proxy-to-socks");
const { exec } = require("child_process");

const config = require("./shadowsocks-config.json");

// Start Shadowsocks server
exec(`ssserver -c shadowsocks-config.json -d start`, (err) => {
  if (err) {
    console.error(`Error starting Shadowsocks: ${err}`);
    return;
  }
  console.log("Shadowsocks server started");
});

// Create a SOCKS proxy server
const proxy = createServer({
  socksHost: "127.0.0.1",
  socksPort: 1080,
});

// Start the HTTP server
http
  .createServer((req, res) => {
    proxy.web(req, res);
  })
  .listen(3000, () => {
    console.log("Proxy server listening on port 3000");
  });


// ss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTozdk5XM2dtS0J3Njh1UDVPVGMyVmRyQHR1cmtleS05NjMwMjIxLm9rLXNlcnZlci5ydTo1MjUzOQ==#new server