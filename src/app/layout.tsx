import localFont from "next/font/local";

const NimbusCondensed = localFont({
  src: "./fonts/NimbusSanL-ReguCond.ttf",
  variable: "--font-nimbus-condensed",
  display: "swap",
});

const Nimbus = localFont({
  src: "./fonts/NimbusSanL-Regu.ttf",
  variable: "--font-nimbus",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NimbusCondensed.variable} ${Nimbus.variable}`}>
        {children}
      </body>
    </html>
  );
}
