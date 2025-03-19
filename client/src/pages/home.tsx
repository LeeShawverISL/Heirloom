import { Link } from "wouter";
import { Customizer } from "@/components/jewelry/customizer";
import { SearchResults } from "@/components/jewelry/search-results";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center relative"
        style={{
          backgroundImage: 'url("/jewelry-bg.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-12">
          <h1 className="text-8xl md:text-9xl font-bold text-white tracking-wider">
            HEIRLOOM
          </h1>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/design/necklace">
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[200px] text-lg bg-white/90 hover:bg-white text-black rounded-full"
              >
                NECKLACES
              </Button>
            </Link>
            <Link href="/design/bracelet">
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[200px] text-lg bg-white/90 hover:bg-white text-black rounded-full"
              >
                BRACELETS
              </Button>
            </Link>
            <Link href="/design/ring">
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[200px] text-lg bg-white/90 hover:bg-white text-black rounded-full"
              >
                RINGS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Designer Section */}
      <div id="designer" className="max-w-7xl mx-auto py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8">
            Design Your Perfect Piece
          </h2>
          <Customizer />
          <Separator className="my-12" />
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Similar Designs</h2>
            <SearchResults />
          </div>
        </div>
      </div>
    </div>
  );
}