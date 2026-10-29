import JsonLd from "@/components/JsonLd";
import AiFeatures from "@/components/sections/AiFeatures";
import Clients from "@/components/sections/Clients";
import Explore from "@/components/sections/Explore";
import GetStarted from "@/components/sections/GetStarted";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Problem from "@/components/sections/Problem";
import Testimonials from "@/components/sections/Testimonials";
import Values from "@/components/sections/Values";
import { softwareLd } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareLd} />
      <Hero />
      <Problem />
      <Values />
      <Journey />
      <AiFeatures />
      <Explore />
      <Clients />
      <Testimonials />
      <GetStarted />
    </>
  );
}
