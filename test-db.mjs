import { Client } from "pg";
import { config } from "dotenv";
config();

async function testConnection() {
  console.log("Testing DIRECT_URL (port 5432)...");
  try {
    const url = new URL(process.env.DIRECT_URL);
    const client = new Client({
      host: url.hostname,
      port: parseInt(url.port, 10),
      database: url.pathname.replace(/^\//, ""),
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      ssl: { rejectUnauthorized: false }
    });
    await client.connect();
    console.log("SUCCESS with DIRECT_URL!");
    await client.end();
  } catch (err) {
    console.error("FAIL with DIRECT_URL:", err.message);
  }
}

testConnection();
