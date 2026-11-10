import Header from "@/components/header";
import "@fontsource-variable/inter";
import "./globals.css";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import CommandPalette from "@/components/command-palette";
import ThemeContextProvider from "@/context/theme-context";

export const metadata = {
  title: "Rahul Tiwari | AI-native backend engineer",
  description:
    "Rahul Tiwari builds reliable backend systems and production GenAI with Java, Spring Boot and Spring AI.",
};

// Dev only. Some browser extensions (Bitdefender, for one) add attributes such as
// bis_skin_checked to the page before React hydrates, which React then reports as a
// hydration mismatch. This removes them as they appear, until shortly after load.
const stripExtensionAttributes = `(function () {
  function strip(el) {
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      var name = el.attributes[i].name;
      if (name === "bis_skin_checked" || name === "bis_register" || name.indexOf("__processed_") === 0) {
        el.removeAttribute(name);
      }
    }
  }
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) strip(mutations[i].target);
  });
  observer.observe(document.documentElement, { attributes: true, subtree: true });
  window.addEventListener("load", function () {
    setTimeout(function () { observer.disconnect(); }, 3000);
  });
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        {/* The site has its own dark theme. This stops the Dark Reader extension from recolouring it. */}
        <meta name="darkreader-lock" />
        {process.env.NODE_ENV === "development" && (
          <script dangerouslySetInnerHTML={{ __html: stripExtensionAttributes }} />
        )}
      </head>
      <body
        className={`font-sans bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50/90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <CommandPalette />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
