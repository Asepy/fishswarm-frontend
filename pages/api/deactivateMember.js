function deactivateMember(document) {
  return fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/members/${document}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
  );
}

export default async function handler(req, res) {
  try {
    const { document } = req.query;
    console.log("Searching with: ", document);
    const response = await deactivateMember(document);
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