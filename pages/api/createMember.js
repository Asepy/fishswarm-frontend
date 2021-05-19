function postMember(newMember) {
  const {
    name,
    document,
    surname,
    birthdate,
    cellphone,
    email,
    ruc,
    cityId = 1,
  } = newMember;
  const requiredValues = {
    name,
    document,
    surname,
    birthdate,
    cellphone,
    email,
    ruc,
    cityId,
  };
  const body = JSON.stringify(requiredValues);
  console.log("sending", { body });
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}/members`, {
    body,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    method: "POST",
  });
}

export default async function handler(req, res) {
  try {
    if (req.body.tarroMiel) {
      // Método de seguridad anti bots
      // si este campo
      return res.status(400).json({ message: "Error: 3421" });
    }
    const response = await postMember(req.body);
    const data = await response.json();
    console.log("Response was:", data);
    const { success, message = "" } = data;
    if (success === "false") {
      res.status(400).json(data);
      return;
    }
    if (message.toLowerCase().includes("internal server error")) {
      res.status(500).json(data);
      return;
    }
    res.status(200).json(data);
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
