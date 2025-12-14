import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata = {
  title: 'BookFlow - Smart Booking for Mobile Services',
  description: 'A complete booking system designed for businesses that travel to customers.',
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen">
            <Toaster position="top-right" richColors />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}