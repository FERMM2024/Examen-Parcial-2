import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block">GameScape</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/catalog"
            className={cn(
              'transition-colors hover:text-foreground/80 text-foreground/60'
            )}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
