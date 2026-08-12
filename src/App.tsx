import React, { Component, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomCursor } from "./components/portfolio/CustomCursor";
import { SmoothScroll } from "./components/portfolio/SmoothScroll";
import { ScrollProgressBar } from "./components/portfolio/AnimationPrimitives";
import {
  Nav, Hero, Highlights, About, WhyWorkWithMe, Skills, Projects,
  Experience, Research, Contact, Footer,
} from "./components/portfolio/Sections";

const queryClient = new QueryClient();

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Portfolio render error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-cyan-400 font-sans">Vineet Singh Portfolio</h2>
            <p className="text-sm text-gray-400">An unexpected rendering issue occurred on this device.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full bg-cyan-500 text-black text-xs font-semibold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
