module.exports = {
  target: "serverless",
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    CF_DISTRIBUTION_ID: process.env.CF_DISTRIBUTION_ID,
  },
};
