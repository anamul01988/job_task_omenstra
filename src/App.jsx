import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntegrationsSection from "./components/IntegrationsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <IntegrationsSection />
    </div>
  );
}
