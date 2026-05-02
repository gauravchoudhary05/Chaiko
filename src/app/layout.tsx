import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Chaiko - Chai Lovers Unite",
    description: "Experience the best authentic Indian tea at Chaiko in Shillong. A warm, cozy place for chai lovers.",
    keywords: ["Chaiko", "Shillong cafe", "Chai lovers unite", "Kulhad chai", "Authentic Indian tea", "Masala chai"],
    openGraph: {
        title: "Chaiko - Chai Lovers Unite",
        description: "Experience the best authentic Indian tea at Chaiko in Shillong. A warm, cozy place for chai lovers.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body>{children}</body>
        </html>
    );
}
