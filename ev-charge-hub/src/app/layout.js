import { Kanit } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/utils/LayoutProvider";
import { LocationProvider } from "@/utils/UserLocationProvider";
import { DistanceProvider } from "@/utils/DistanceContext";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Ev Charge Hub",
  description: "Every Station, Every Destination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} antialiased max-w-xl mx-auto relative`}
      >
        <LocationProvider>
          <DistanceProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </DistanceProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
