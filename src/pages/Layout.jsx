import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils/index";
import { User } from "@/api/entities";
import { Notification } from "@/api/entities";
import {
  Shield,
  Menu,
  X,
  Search,
  ChevronDown,
  Bell,
  LogOut,
  User as UserIcon,
  Settings,
  BriefcaseBusiness,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from 'date-fns';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleGlobalError = this.handleGlobalError.bind(this);
    this.handleGlobalRejection = this.handleGlobalRejection.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error (React lifecycle):", error, errorInfo);
  }

  componentDidMount() {
    window.addEventListener("error", this.handleGlobalError);
    window.addEventListener("unhandledrejection", this.handleGlobalRejection);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleGlobalError);
    window.removeEventListener("unhandledrejection", this.handleGlobalRejection);
  }

  handleGlobalError(event) {
    event.preventDefault();
    console.error("Uncaught error (Global):", event.error || event.message || event);
    this.setState({ hasError: true, error: event.error || new Error(event.message || 'An unknown global error occurred.') });
  }

  handleGlobalRejection(event) {
    event.preventDefault();
    console.error("Uncaught promise rejection (Global):", event.reason);
    this.setState({ hasError: true, error: event.reason || new Error('An unhandled promise rejection occurred.') });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-lg">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h1>
                <p className="text-gray-600 mb-6">
                    We've encountered an unexpected error. Please try refreshing the page. If the problem persists, please contact support.
                </p>
                <Button onClick={() => window.location.reload()}>Refresh Page</Button>
                {this.state.error && window.location.hostname === 'localhost' && (
                    <pre className="mt-4 p-4 bg-gray-100 rounded text-left text-xs overflow-auto">
                        {this.state.error.toString()}
                    </pre>
                )}
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    console.log("[BOOT] main.tsx executing");
    if (!document.getElementById('boot-beacon')) {
        document.body.insertAdjacentHTML(
          "afterbegin",
          '<div id="boot-beacon" style="position:fixed;z-index:99999;top:4px;left:4px;padding:4px 6px;background:#111;color:#fff;font:12px/1.2 system-ui;border-radius:4px">BOOT</div>'
        );
    }
    return () => {};
  }, []);

  useEffect(() => {
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.type = 'image/png';
    favicon.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68cf655520c2199be90281b3/550231a20_transparentshield.png';
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        const allUserNotifications = await Notification.filter({ user_email: currentUser.email }, '-created_date', 100);
        const recentNotifications = allUserNotifications.slice(0, 5);
        const userUnreadCount = allUserNotifications.filter(n => !n.read_at).length;
        
        setNotifications(recentNotifications);
        setUnreadCount(userUnreadCount);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch user session:", error);
      setUser(null);
      setNotifications([]);
      setUnreadCount(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [location.pathname, location.search]);

  const handleLogout = async () => {
    try {
      await User.signOut();
      setUser(null);
      navigate(createPageUrl("home"));
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
      navigate(createPageUrl("home"));
    }
  };

  const handleLogin = async () => {
    await User.loginWithRedirect(window.location.href);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read_at) {
        await Notification.update(notification.id, { read_at: new Date().toISOString() });
        fetchUserData();
    }
    if (notification.link_url) {
        navigate(notification.link_url);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background flex flex-col font-body">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-50 h-24 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-full">
              {/* Logo */}
              <Link to={createPageUrl("home")} className="flex items-center gap-3">
                <img 
                  src="/images/logo-shield-check.png" 
                  alt="ReportHere Logo" 
                  className="h-10 w-auto object-contain"
                />
                <span className="text-2xl font-bold text-slate-900 tracking-tight">ReportHere</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link to={createPageUrl("companies")} className="text-foreground hover:text-primary font-medium text-lg transition-colors">
                  Companies
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-foreground hover:text-primary font-medium text-lg transition-colors focus:outline-none">
                      Categories <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("companies?category=technology")}>Technology</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("companies?category=retail")}>Retail</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("companies?category=services")}>Services</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to={createPageUrl("blog")} className="text-foreground hover:text-primary font-medium text-lg transition-colors">
                  Blog
                </Link>
                <Link to={createPageUrl("about")} className="text-foreground hover:text-primary font-medium text-lg transition-colors">
                  About
                </Link>
              </nav>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <Link to={createPageUrl("for-consumers")}>
                  <Button variant="ghost" className="text-foreground hover:text-primary font-medium text-base">
                    For Consumers
                  </Button>
                </Link>
                <Link to={createPageUrl("for-businesses")}>
                  <Button variant="ghost" className="text-foreground hover:text-primary font-medium text-base">
                    For Businesses
                  </Button>
                </Link>

                {user ? (
                  <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <Bell className="h-5 w-5" />
                          {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <DropdownMenuItem 
                              key={notification.id} 
                              className={`cursor-pointer ${!notification.read_at ? 'bg-muted/50' : ''}`}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">{notification.title}</span>
                                <span className="text-xs text-muted-foreground">{notification.message}</span>
                                <span className="text-[10px] text-muted-foreground">
                                  {formatDistanceToNow(new Date(notification.created_date), { addSuffix: true })}
                                </span>
                              </div>
                            </DropdownMenuItem>
                          ))
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("notifications")} className="w-full text-center block">
                            View all notifications
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="hidden xl:inline-block max-w-[100px] truncate">
                            {user.email}
                          </span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("userprofile")}>
                            <UserIcon className="mr-2 h-4 w-4" /> Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("dashboard")}>
                            <BriefcaseBusiness className="mr-2 h-4 w-4" /> Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={createPageUrl("settings")}>
                            <Settings className="mr-2 h-4 w-4" /> Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                          <LogOut className="mr-2 h-4 w-4" /> Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Button 
                    onClick={handleLogin}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 rounded-full"
                  >
                    Login
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-24 left-0 w-full bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col space-y-4">
              <Link to={createPageUrl("companies")} className="text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Companies</Link>
              <Link to={createPageUrl("blog")} className="text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link to={createPageUrl("about")} className="text-lg font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <div className="h-px bg-border my-2" />
              <Link to={createPageUrl("for-consumers")} className="text-base font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>For Consumers</Link>
              <Link to={createPageUrl("for-businesses")} className="text-base font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>For Businesses</Link>
              <div className="h-px bg-border my-2" />
              {user ? (
                <>
                  <Link to={createPageUrl("userprofile")} className="flex items-center gap-2 text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
                    <UserIcon className="h-4 w-4" /> Profile
                  </Link>
                  <Link to={createPageUrl("dashboard")} className="flex items-center gap-2 text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
                    <BriefcaseBusiness className="h-4 w-4" /> Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-base font-medium text-red-600 text-left">
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </>
              ) : (
                <Button onClick={() => { handleLogin(); setMobileMenuOpen(false); }} className="w-full bg-primary text-primary-foreground rounded-full">
                  Login
                </Button>
              )}
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-border py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="col-span-1 md:col-span-1">
                <Link to={createPageUrl("home")} className="flex items-center gap-2 mb-4">
                  <Shield className="h-8 w-8 text-primary fill-current" />
                  <span className="text-xl font-bold text-foreground">ReportHere</span>
                </Link>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Building trust through transparency. Read real reviews, share your experiences, and help others make better decisions.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-bold text-foreground mb-4">Platform</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to={createPageUrl("about")} className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link to={createPageUrl("companies")} className="hover:text-primary transition-colors">Browse Companies</Link></li>
                  <li><Link to={createPageUrl("blog")} className="hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link to={createPageUrl("careers")} className="hover:text-primary transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-4">Community</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to={createPageUrl("guidelines")} className="hover:text-primary transition-colors">Community Guidelines</Link></li>
                  <li><Link to={createPageUrl("trust")} className="hover:text-primary transition-colors">Trust & Safety</Link></li>
                  <li><Link to={createPageUrl("help")} className="hover:text-primary transition-colors">Help Center</Link></li>
                  <li><Link to={createPageUrl("contact")} className="hover:text-primary transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to={createPageUrl("terms")} className="hover:text-primary transition-colors">Terms of Service</Link></li>
                  <li><Link to={createPageUrl("privacy")} className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link to={createPageUrl("cookie")} className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ReportHere. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {/* Social icons could go here */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
