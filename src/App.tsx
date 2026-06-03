import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomCursor } from "./components/portfolio/CustomCursor";
import { SmoothScroll } from "./components/portfolio/SmoothScroll";
import { ScrollProgressBar } from "./components/portfolio/AnimationPrimitives";
import {
  Nav, Hero, Highlights, About, WhyWorkWithMe, Skills, Projects,
  Experience, Research, Contact, Footer,
} from "./components/portfolio/Sections";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative bg-background text-foreground min-h-screen">
        <ScrollProgressBar />
        <CustomCursor />
        <SmoothScroll />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <Highlights />
          <About />
          <WhyWorkWithMe />
          <Skills />
          <Projects />
          <Experience />
          <Research />
          <Contact />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
