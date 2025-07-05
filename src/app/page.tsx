import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="A collage of vibrant anime-style game characters"
            fill
            className="object-cover z-0"
            data-ai-hint="anime games collage"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="z-20 container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Your Next Adventure Awaits</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              Discover a universe of games, from epic RPGs to mind-bending puzzles.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/catalog">
                Explore Catalog <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="py-12 md:py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Explore Vast Worlds</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="A futuristic cityscape"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="cyberpunk city"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Cyberpunk Futures</h3>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="A lush fantasy landscape"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="fantasy landscape"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Fantasy Realms</h3>
              </div>
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="A spaceship flying through a nebula"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="space nebula"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Cosmic Journeys</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
