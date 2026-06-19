import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

