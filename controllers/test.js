const config = {
  v: "2",
  ps: "My V2Ray Server",
  add: "154.209.219.70",
  port: "62659",
  id: "your-uuid-here", // Replace with your UUID
  aid: "0",
  scy: "auto",
  net: "tcp",
  type: "none",
  host: "",
  path: "",
  tls: "tls",
};

const base64Config = Buffer.from(JSON.stringify(config)).toString("base64");
console.log(`v2ray://${base64Config}`);
