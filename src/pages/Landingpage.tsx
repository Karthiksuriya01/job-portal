import { MagicCard } from '@/components/ui/magic-card';

import { Link } from 'react-router-dom';
import { useTheme } from "next-themes";
import { Meteors } from '@/components/ui/meteors';

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "YouTube",
  "Instagram",
  "Uber",
  "Spotify",
];
const Landingpage = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center relative overflow-hidden">
      <Meteors number={30} />
      <main className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Find Your Dream Job Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
            Connect with top employers and discover opportunities that match your skills and aspirations.
          </p>
          <Link 
            to="/onboarding"
            className="px-4 md:px-6 py-2 md:py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg font-medium"
          >
            Start Your Journey
          </Link>
        </div>
        <div>
        <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            TRUSTED BY Major Comapanies
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 xl:grid-cols-8 xl:gap-4">
              {companies.map((logo, idx) => (
                <img
                  key={idx}
                  src={`https://cdn.magicui.design/companies/${logo}.svg`}
                  className="h-10 w-40 px-2 dark:brightness-0 dark:invert"
                  alt={logo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
      </main>
    </div>
  );
}

export default Landingpage;
