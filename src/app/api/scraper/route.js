import metascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperTitle from "metascraper-title";
// import metascraperImage from "metascraper-image"; // Optional: Extracts images

export const runtime = "nodejs"; // Ensures compatibility with native Node.js modules

const scraper = metascraper([metascraperDescription(), metascraperTitle()]);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch website HTML (Use a User-Agent header to avoid being blocked)
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch webpage" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const html = await response.text();
    const metadata = await scraper({ html, url });

    return new Response(
      JSON.stringify({
        title: metadata.title || "No title found",
        description: metadata.description || "No description found",
        image: metadata.image || "No image found",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
