import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/portfolio";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: `${PERSONAL_INFO.fullName} — Software Engineer | Backend Engineer | AI Developer`,
  description:
    "Portfolio of Savindu Shiranjaya Warnakulasooriya — Software Engineer specializing in backend engineering, scalable REST and GraphQL APIs, full-stack web development, security controls, and AI-assisted development workflows.",
  keywords: [
    "Savindu Shiranjaya Warnakulasooriya",
    "Software Engineer",
    "Backend Engineer",
    "AI Developer",
    "Django REST Framework",
    "Python",
    "Next.js",
    "React",
    "Full-Stack Developer",
    "Cybersecurity",
  ],
  authors: [{ name: PERSONAL_INFO.fullName }],
  creator: PERSONAL_INFO.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${PERSONAL_INFO.fullName} — Software Engineer | Backend Engineer | AI Developer`,
    description:
      "Building Scalable Software. Engineering Intelligent Solutions. Portfolio featuring backend APIs, AI skill workflows, and real client web platforms.",
    siteName: `${PERSONAL_INFO.fullName} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.fullName} — Software Engineer | Backend Engineer | AI Developer`,
    description:
      "Building Scalable Software. Engineering Intelligent Solutions. Backend systems, APIs, cloud platforms, and full-stack web engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0D0F" },
  ],
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var theme = (stored === 'dark' || stored === 'light') ? stored : 'light';
    var meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute('content', theme);
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <meta name="color-scheme" content="light" />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Static theme initialization script prevents light/dark FOUC before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
