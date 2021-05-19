function editMember(document, editMember) {
  const body = JSON.stringify(editMember);
  console.log("Sending body for editMember :: ", { body });
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}/members/${document}`, {
    body,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    method: "PUT",
  });
}

export default async function handler(req, res) {
  try {
    const { document } = req.query;
    const response = await editMember(document, req.body);
    const data = await response.json();
    console.log("Response for editMember was:", data);
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
