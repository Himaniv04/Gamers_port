import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export const metadata = {
  title: "Gamer's Port | Elite Gaming Lounge & Booking Engine",
  description:
    "Book high-end gaming PCs, PS5 booths, and VR stations at Gamer's Port. Real-time slot availability, instant confirmation & esports events.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className="min-h-screen flex flex-col bg-[#090d16] text-gray-100 selection:bg-cyan-500 selection:text-black">
          {/* Razorpay Checkout SDK Script */}
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload"
          />

          <Navbar />
          <main className="flex-1">{children}</main>

          <footer className="glass-panel border-t border-cyan-500/10 py-8 text-center text-gray-400 text-sm font-mono">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                © {new Date().getFullYear()} Gamer's Port Gaming Cafe. All rights reserved.
              </div>
              <div className="flex gap-6 text-xs text-gray-400">
                <span className="hover:text-cyan-400 cursor-pointer">Terms of Service</span>
                <span className="hover:text-cyan-400 cursor-pointer">Privacy Policy</span>
                <span className="hover:text-cyan-400 cursor-pointer">Cafe Rules</span>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
