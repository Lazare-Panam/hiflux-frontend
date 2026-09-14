import ContactCTA from "./Landing/ContactCTA";
import FeaturedProducts from "./Landing/FeaturedProducts";
import Hero from "./Landing/Hero";
import HeaMembership from "./Landing/HeaMembership";
import HifluxSection from "./Landing/HifluxSection";
import HifluxStats from "./Landing/HifluxStats";
import IndustriesSection from "./Landing/IndustryApplications";

export default function Home() {
  return (
    <>
      <Hero />
      <HeaMembership />
      <HifluxSection />
      <FeaturedProducts />
      <HifluxStats/>
      <IndustriesSection/>
      <ContactCTA/>
    </>
  );
}
