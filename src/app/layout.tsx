import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Background } from "@/components/layout/Background";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SkipLink } from "@/components/layout/SkipLink";
import { Preloader } from "@/components/motion/Preloader";
import { Providers } from "@/components/motion/Providers";
import { githubProfileUrl, profile } from "@/content";
import { geistMono, geistSans } from "@/lib/fonts";
import { siteDescription, siteKeywords, siteTitle, siteUrl } from "@/lib/site";
import { PRELOAD_FLAG } from "@/lib/preload";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s · ${profile.name}` },
  description: siteDescription,
  keywords: siteKeywords,
  creator: profile.name,
  authors: [{ name: profile.name, url: githubProfileUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    siteName: profile.name,
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0f",
  colorScheme: "dark",
};

/** Landmarks: skip link → <header> (Nav) → <main id="main"> (each page) → <footer>. */
const prePaintScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('${PRELOAD_FLAG}')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('skip-preload','intro-go')}}catch(e){d.classList.add('skip-preload','intro-go')}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable)}
      // The inline script below adds `js` before hydration; that attribute difference is expected.
      suppressHydrationWarning
    >
      <head>
        {/* A real inline script, run while the HTML is parsed (before first paint): marks JS
            availability (reveals never hide no-JS content) and skips the preloader on repeat
            visits in this session or under reduced motion. next/script's beforeInteractive was
            not used: in the App Router it is queued and runs only after the runtime boots. */}
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
      </head>
      <body className="text-text-primary">
        <Preloader />
        <SkipLink />
        <Background />
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
