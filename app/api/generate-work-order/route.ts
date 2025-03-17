import { NextResponse } from "next/server";
import chrome from "html-pdf-chrome";

export async function GET() {
  try {
    const htmlContent = `
      <html>
        <body>
          <h1>Hello from HTML-PDF-Chrome</h1>
          <p>This PDF was generated using a serverless-friendly library.</p>
        </body>
      </html>
    `;

    // Define options explicitly
    const options: any = {
      format: "A4", // ✅ Fix for the red line
    };

    // Generate PDF
    const pdfBuffer: any = await chrome.create(htmlContent, options);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}
