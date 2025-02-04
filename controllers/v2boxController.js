const fs = require("fs");

function generateV2rayConfig(config) {
  const v2rayConfig = {
    log: {
      loglevel: "warning",
    },
    inbounds: [
      {
        port: 1080,
        listen: "127.0.0.1",
        protocol: "socks",
        settings: {
          auth: "noauth",
        },
        sniffing: {
          enabled: true,
          destOverride: ["http", "tls"],
        },
      },
    ],
    outbounds: [
      {
        protocol: "socks",
        settings: {
          servers: [
            {
              address: config.add, // Server address
              port: config.port, // Port
              users: [
                {
                  user: config.user, // Username
                  pass: config.pass, // Password
                },
              ],
            },
          ],
        },
        streamSettings: {
          network: "tcp",
        },
      },
    ],
    dns: {
      servers: ["8.8.8.8"],
    },
  };

  return v2rayConfig;
}

function saveV2rayConfigToFile(config) {
  const v2rayConfig = generateV2rayConfig(config);
  const configJson = JSON.stringify(v2rayConfig, null, 2); // Pretty-printed JSON with 2 spaces indentation

  console.log(configJson);
}

const config = {
  add: "154.209.219.70", // Server address
  port: "62659", // Port
  user: "7tRsNFFB", // SOCKS5 username
  pass: "6ETbtW6K", // SOCKS5 password
};

saveV2rayConfigToFile(config);
