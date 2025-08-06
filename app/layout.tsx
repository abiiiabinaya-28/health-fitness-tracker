// app/layout.tsx (server component)
import './globals.css';
import ClientLayout from './components/ClientLayout';

export const metadata = {
  title: 'FitTrack - Health & Fitness Tracker',
  description: 'Track workouts, meals, and health goals easily',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
