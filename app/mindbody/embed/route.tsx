import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const widget = searchParams.get("widget") || "booking"
  const theme = searchParams.get("theme") || "light"
  const businessId = searchParams.get("businessId") || "default"

  // Validate widget type
  const validWidgets = ["booking", "services", "staff"]
  const widgetType = validWidgets.includes(widget as string) ? (widget as "booking" | "services" | "staff") : "booking"

  // Validate theme
  const validThemes = ["light", "dark"]
  const themeType = validThemes.includes(theme as string) ? (theme as "light" | "dark") : "light"

  // Return the HTML for the embed widget
  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Beauty Bar Parlour Widget</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        :root {
          --primary: #c0a678;
          --background: ${themeType === "dark" ? "#1a1a1a" : "#ffffff"};
          --foreground: ${themeType === "dark" ? "#ffffff" : "#000000"};
        }
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: var(--background);
          color: var(--foreground);
        }
      </style>
    </head>
    <body>
      <div id="widget-root"></div>
      <script>
        // Initialize the widget
        document.addEventListener('DOMContentLoaded', function() {
          // In a real implementation, this would render the React component
          // For demo purposes, we'll just show a message
          document.getElementById('widget-root').innerHTML = 
            '<div style="padding: 20px; text-align: center;">' +
            '<h2 style="font-family: \'Cormorant Garamond\', serif; margin-bottom: 16px;">Beauty Bar Parlour</h2>' +
            '<p style="margin-bottom: 16px;">Widget type: ${widgetType}</p>' +
            '<p style="margin-bottom: 16px;">Theme: ${themeType}</p>' +
            '<p style="margin-bottom: 16px;">Business ID: ${businessId}</p>' +
            '<a href="https://beautybar.parlour/booking" style="display: inline-block; padding: 12px 24px; background-color: var(--primary); color: white; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px;">Book Now</a>' +
            '</div>';
        });
      </script>
    </body>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  )
}
