import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";
import BusinessDashboard from "./pages/BusinessDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FileComplaint from "./pages/FileComplaint";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/companies" component={Placeholder} />
        <Route path="/categories" component={Placeholder} />
        <Route path="/blog" component={Placeholder} />
        <Route path="/about" component={Placeholder} />
        <Route path="/consumers" component={ConsumerDashboard} />
        <Route path="/file-complaint" component={FileComplaint} />
        <Route path="/businesses" component={BusinessDashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={Placeholder} />
        <Route path="/reviews" component={Placeholder} />
        <Route path="/business/claim" component={Placeholder} />
        <Route path="/business/plans" component={Placeholder} />
        <Route path="/business/resources" component={Placeholder} />
        <Route path="/business/contact" component={Placeholder} />
        <Route path="/careers" component={Placeholder} />
        <Route path="/legal/privacy" component={Placeholder} />
        <Route path="/legal/terms" component={Placeholder} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
