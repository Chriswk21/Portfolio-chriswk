import { existsSync } from "node:fs";
import path from "node:path";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Marquee } from "@/components/marquee";
import { Projects } from "@/components/projects";
import { Skillset } from "@/components/skillset";
import { Background } from "@/components/background";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

// Drop a portrait at public/images/profile.jpg and the hero picks it up.
function findPhoto(): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (existsSync(path.join(process.cwd(), "public", "images", `profile.${ext}`))) {
      return `/images/profile.${ext}`;
    }
  }
  return null;
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero photo={findPhoto()} />
        <Intro />
        <Marquee />
        <Projects />
        <Skillset />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
