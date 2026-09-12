import { Sparkles, Play, HeartHandshake, BookOpen, Coffee, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const versions = [
  {
    id: 'fun',
    title: 'Fun',
    description: 'The goofball, laughter, and unbounded energy.',
    icon: Sparkles,
  },
  {
    id: 'dancer',
    title: 'Dancer & Creator',
    description: 'Motion, spotlight, and relentless creativity.',
    icon: Play,
  },
  {
    id: 'therapist',
    title: 'Therapist',
    description: 'Empathy, listening, and deep connection.',
    icon: HeartHandshake,
  },
  {
    id: 'academic',
    title: 'Serious & Academic',
    description: 'Focus, ambition, and intellectual rigor.',
    icon: BookOpen,
  },
  {
    id: 'gentle',
    title: 'Normal & Gentle',
    description: 'Calm, grounded, and peacefully present.',
    icon: Coffee,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-24 px-6 sm:px-12 lg:px-24">
      {/* Header */}
      <header className="w-full max-w-5xl mx-auto flex flex-col items-center text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
          Oluchi<span className="text-red-primary">.</span>
        </h1>
        <p className="text-muted-silver text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
          Welcome to the multiverse. Explore the different versions, energies, and facets that make up the whole.
        </p>
      </header>

      {/* Hero / Multiverse Section */}
      <section className="w-full max-w-5xl mx-auto mb-32 relative">
        <div className="flex flex-wrap justify-center gap-6">
          {versions.map((version, index) => {
            const Icon = version.icon;
            return (
              <div
                key={version.id}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] group relative p-8 rounded-2xl bg-plum-surface border border-red-600/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-red-primary/50 hover:shadow-[0_0_40px_rgba(255,51,75,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${index * 150}ms`, animationDuration: '1000ms' }}
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-obsidian border border-red-600/20 flex items-center justify-center mb-6 group-hover:border-red-primary/40 group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-5 h-5 text-red-primary" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-wide">{version.title}</h3>
                  <p className="text-muted-silver font-light leading-relaxed">
                    {version.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Links */}
      <footer className="w-full max-w-5xl mx-auto border-t border-red-600/10 pt-16 flex flex-col items-center animate-in fade-in duration-1000 delay-700 fill-mode-both">
        <h2 className="text-muted-silver mb-8 font-light tracking-[0.2em] uppercase text-sm">Connect</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="https://tiktok.com/@OluchiUsername"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-plum-surface border border-red-600/20 text-white transition-all duration-300 hover:border-red-primary/50 hover:bg-red-primary/10 hover:shadow-[0_0_20px_rgba(255,51,75,0.15)]"
          >
            <span className="font-medium tracking-wide">TikTok</span>
            <ArrowUpRight className="w-4 h-4 text-muted-silver group-hover:text-red-primary transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="https://snapchat.com/add/OluchiUsername"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-plum-surface border border-red-600/20 text-white transition-all duration-300 hover:border-red-primary/50 hover:bg-red-primary/10 hover:shadow-[0_0_20px_rgba(255,51,75,0.15)]"
          >
            <span className="font-medium tracking-wide">Snapchat</span>
            <ArrowUpRight className="w-4 h-4 text-muted-silver group-hover:text-red-primary transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
