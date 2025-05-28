import './global.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Multi-Tenant Dashboard',
  description: 'A multi-tenant transportation dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
