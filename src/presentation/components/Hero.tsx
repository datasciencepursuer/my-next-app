import MaxWidthWrapper from '@/presentation/components/layout/MaxWidthWrapper';
import ScrollNavLink from '@/presentation/components/ScrollNavLink';
import Button from '@/presentation/components/ui/Button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen -mt-18">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://o6so15s6oe.ufs.sh/f/IF7FvZlZ7vKmXQ7Ln51Ol0SVZyrj5JsoTuE2GBDW1kHNF9gc"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <MaxWidthWrapper className="text-center text-white">
          <div className="bg-[#FFFFFF] bg-clip-text text-transparent">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Innovative Technology Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transforming businesses through cutting-edge technology and expert consulting
            </p>
            <div className="mb-8">
              <Button>
              <ScrollNavLink
                href="/#services"
                className="inline-block text-white px-8 py-3 rounded-lg text-lg font-medium transition-all hover:scale-105"
              >
                Explore Our Services
              </ScrollNavLink>
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}