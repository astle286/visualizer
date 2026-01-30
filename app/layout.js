export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "sans-serif",
          minHeight: "100vh",
          background: "#020024",
          backgroundImage:
            "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 41%, rgb(5, 56, 37) 100%)",
          color: "white",
        }}
      >
        {children}
      </body>
    </html>
  );
}
