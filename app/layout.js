import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Duv-Duv Gap — O'zbekistondagi birinchi kreativlik maktabi",
  description: "3 oyda kreativ kommunikatsiyalar sohasida professional bilim, real loyihalar va Agency 605 da ishlash imkoniyati.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={jakarta.variable}>
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
