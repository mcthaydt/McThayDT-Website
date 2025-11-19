import { ReactLenis } from 'lenis/react';
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/ui/custom-cursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Lenis options for a "heavy", smooth feel common in awwwards sites
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <TooltipProvider>
        <CustomCursor />
        <Toaster />
        <Router />
      </TooltipProvider>
    </ReactLenis>
  );
}

export default App;
