import React from "react";
import NotebookLines from "../components/NotebookLines/NotebookLines";
import { Metadata } from "next";
import { Caveat_Brush } from "next/font/google";
import { Gochi_Hand } from "next/font/google";
import "./Layout.scss";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const caveat_brush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-caveat-brush",
});
const gochi_hand = Gochi_Hand({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-gochi-hand",
});

export const metadata: Metadata = {
  title: "My Logic Hub",
  description:
    "Simplify logic with myLogicHub: propositional and quantificational logic calculators, Venn diagrams, truth tables, semantic tableaux generators, and more.",
  manifest: "./manifest.json",
  themeColor: "#000000",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${caveat_brush.variable} ${gochi_hand.variable} cursive`}
      >
        <NotebookLines />
        <div className="container">{children}</div>
        <Analytics />
        <GoogleAnalytics gaId="G-3VLX2DXHWL" />
      </body>
    </html>
  );
}
