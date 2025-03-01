const { exec } = require("child_process");
const Config = require("../models/Config");

const addClient = async (req, res) => {
  const clientName = req.body.name;

  try {
    const passwordOption = "1";
    const command = `echo -e "1\n${clientName}\n${passwordOption}\n" | sudo ./openvpn-install.sh`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        return res
          .status(500)
          .json({ error: `Error adding client: ${stderr}` });
      }

      // Сохранение информации о конфигурации в базе данных
      const config = await Config.create({ name: clientName });
      return res
        .status(201)
        .json({ message: "Client added successfully", config });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { addClient };
