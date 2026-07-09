import ContactCTA from "./Landing/ContactCTA";
import FeaturedProducts from "./Landing/FeaturedProducts";
import Hero from "./Landing/Hero";
import HifluxSection from "./Landing/HifluxSection";
import HifluxStats from "./Landing/HifluxStats";
import IndustriesSection from "./Landing/IndustryApplications";

export default function Home() {
  return (
    <>
      <Hero />
      <HifluxSection />
      <FeaturedProducts />
      <HifluxStats/>
      <IndustriesSection/>
      <ContactCTA/>
    </>
  );
}
