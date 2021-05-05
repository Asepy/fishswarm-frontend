import serialize from "utils/serialize";

function filterMember(queryParams) {
  const queryParamsStr = serialize(queryParams);
  console.log({ queryParamsStr });
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/filter?${queryParamsStr}`,
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
    const response = await filterMember(req.query);
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
    const parsedData = data.data.map((member) =>
      typeof member === "string" ? JSON.parse(member) : member
    );
    res.status(200).json({ ...data, data: parsedData });
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
