import { Kanit } from "next/font/google";
import "./globals.css";
import { LocationProvider } from "@/utils/UserLocationProvider";
import { DistanceProvider } from "@/utils/DistanceContext";
import { AuthProvider } from "@/utils/authContext";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${kanit.variable} antialiased mx-auto relative`}>
      <AuthProvider>
        <LocationProvider>
          <DistanceProvider>
              {children}
          </DistanceProvider>
        </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}