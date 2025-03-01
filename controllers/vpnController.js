const { exec } = require("child_process");
const Config = require("../models/Config");

// Helper function to execute shell commands
const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr);
      }
      resolve(stdout);
    });
  });
};

const addClient = async (req, res) => {
  const clientName = req.body.name;

  // Input validation (basic example)
  if (!clientName || typeof clientName !== 'string' || clientName.length === 0) {
    return res.status(400).json({ error: "Invalid client name" });
  }

  try {
    const passwordOption = "1"; // Consider using a more secure method for passwords
    const command = `echo -e "1\n${clientName}\n${passwordOption}\n" | sudo ./openvpn-install.sh`;

    // Execute the command to add the client
    await execPromise(command);

    // Move the generated .ovpn file
    const command_mv = `mv /root/${clientName}.ovpn /root/project/public/${clientName}.ovpn`;
    await execPromise(command_mv);

    // Save configuration information in the database
    const config = await Config.create({ name: clientName });

    return res.status(201).json({
      message: "Client added successfully",
      config: {
        ...config,
        url: `http://45.61.133.6:3000/${clientName}.ovpn`
      }
    });
  } catch (error) {
    return res.status(500).json({ error: `Error adding client: ${error}` });
  }
};

module.exports = { addClient };