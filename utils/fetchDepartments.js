export default async function fetchDepartments() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/deparments`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
      }
    }
  );
  const data = await response.json();
  // eslint-disable-next-line no-console
  console.log("Response was:", data);
  const parsedData = data.data.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  );
  return { ...data, data: parsedData };
}
