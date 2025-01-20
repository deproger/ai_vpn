const crypto = require("crypto");
const fs = require("fs");

// Function to generate RSA key pair based on username and password
const generateKeyPair = (username, password) => {
  // Create a unique seed from the username and password
  const seed = crypto
    .createHash("sha256")
    .update(username + password)
    .digest("hex");

  // Generate the RSA key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Key size
    publicKeyEncoding: {
      type: "spki", // Recommended for public keys
      format: "pem", // Format of the key
    },
    privateKeyEncoding: {
      type: "pkcs8", // Recommended for private keys
      format: "pem", // Format of the key
    },
  });

  // Save the keys to files
  fs.writeFileSync(`${username}_privateKey.pem`, privateKey);
  fs.writeFileSync(`${username}_publicKey.pem`, publicKey);

  console.log(`Keys generated and saved to files for user: ${username}`);

  return { publicKey, privateKey };
};

// Function to generate WireGuard configuration
const generateWireGuardConfig = (username, password, endpoint, listenPort) => {
  const allowedIPs = "0.0.0.0/0";
  const { publicKey, privateKey } = generateKeyPair(username, password);
  const config = `
[Interface]
PrivateKey = ${privateKey}
Address = 10.0.0.1/24
ListenPort = ${listenPort}

[Peer]
PublicKey = ${publicKey}
Endpoint = ${endpoint}
AllowedIPs = ${allowedIPs}
`;

  // Save the configuration to a file
  fs.writeFileSync(`${username}_wg0.conf`, config.trim());
  console.log(
    `WireGuard configuration file '${username}_wg0.conf' generated successfully.`
  );
};

// Example usage
const username = "exampleUser "; // Replace with the actual username
const password = "examplePassword"; // Replace with the actual password
const endpoint = "your_proxy_ip:51820"; // Replace with your proxy IP and port
const listenPort = 51820; // Replace with your desired listen port

module.exports = {
  generateWireGuardConfig,
};
