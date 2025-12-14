'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    // Remove any locale prefix from pathname
    let pathnameWithoutLocale = pathname;
    
    // Remove /id prefix if exists
    if (pathname.startsWith('/id')) {
      pathnameWithoutLocale = pathname.replace('/id', '') || '/';
    }
    // Remove /en prefix if exists (though it shouldn't with as-needed strategy)
    if (pathname.startsWith('/en')) {
      pathnameWithoutLocale = pathname.replace('/en', '') || '/';
    }
    
    // Navigate to new locale
    // English (default) doesn't need prefix
    if (newLocale === 'en') {
      router.push(pathnameWithoutLocale);
    } else {
      // Other locales need prefix
      router.push(`/${newLocale}${pathnameWithoutLocale}`);
    }
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/10">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.label}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={locale === lang.code ? 'bg-slate-100' : ''}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}