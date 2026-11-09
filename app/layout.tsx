import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name} | AI-native backend engineer`,
  description:
    "Rahul Tiwari builds reliable backend systems and production GenAI in Java, Spring Boot and Spring AI. Software Engineer on Citi's branded cards platform.",
  openGraph: {
    title: `${site.name} | AI-native backend engineer`,
    description:
      "Java and Spring Boot backends for card payments, and LLM tooling tested like production code.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1626" },
  ],
};

// Sets the theme before first paint so there is no flash of the wrong theme.
const themeScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
