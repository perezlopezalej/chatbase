const requiredEnvVars = [
  "DATABASE_URL",
  "DIRECT_URL",
  "AUTH_SECRET",
  "GROQ_API_KEY",
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}