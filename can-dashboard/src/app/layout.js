import "./globals.css"

export const metadata = {
  title: "CAN Bus Dashboard",
  description: "Real-time CAN bus data visualization dashboard",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}