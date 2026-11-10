import './globals.css';

export const metadata = {
  title: 'Md. Istiar Uddin Tonmoy | Junior Web Developer',
  description: 'Portfolio of Md. Istiar Uddin Tonmoy: React, Next.js, Node.js and MongoDB projects.',
};

// Runs before first paint so there is no light/dark flash
const themeScript = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 bg-fixed font-sans text-slate-800 antialiased dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-200">
        {children}
      </body>
    </html>
  );
}
