import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

const hosts = ["google.com", "cloudflare.com", "github.com"];

export async function GET() {
  const results = {};

  for (const host of hosts) {
    try {
      const { stdout } = await execPromise(`ping -c 1 ${host}`);
      const match = stdout.match(/Average = (\d+)ms/);
      results[host] = match ? parseFloat(match[1]) : null;
    } catch {
      results[host] = null;
    }
  }

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
