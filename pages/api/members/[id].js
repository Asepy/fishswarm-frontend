function searchMember({ document, birthdate }) {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/${document}?birthdate=${birthdate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
}

export default async function handler(req, res) {
  try {
    const { id: document, birthdate } = req.query;
    console.log("searching with", { document, birthdate });
    const response = await searchMember({ document, birthdate });
    const data = await response.json();
    console.log("Search Response was:", data);
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
