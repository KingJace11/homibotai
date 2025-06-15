import '../globals.css';
import SessionWrapper from './SessionWrapper';

export const metadata = {
  title: 'HomiBot.ai',
  description: 'Let HomiBot do the talking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}