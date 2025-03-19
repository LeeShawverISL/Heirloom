import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/home";
import Favorites from "@/pages/favorites";
import NotFound from "@/pages/not-found";
import NecklaceDesigner from "@/pages/designers/necklace";
import BraceletDesigner from "@/pages/designers/bracelet";
import RingDesigner from "@/pages/designers/ring";
import LoginPage from "@/pages/login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/login" component={LoginPage} />
      <Route path="/design/necklace" component={NecklaceDesigner} />
      <Route path="/design/bracelet" component={BraceletDesigner} />
      <Route path="/design/ring" component={RingDesigner} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Router />
          </main>
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;