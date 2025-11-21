

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Notification } from "@/api/entities";
import {
  Shield,
  FileText,
  Building2,
  Settings,
  User as UserIcon,
  Menu,
  X,
  LogOut,
  Search,
  ChevronDown,
  Bell,
  BriefcaseBusiness,
  UploadCloud,
  Send,
  CreditCard,
  AlertCircle // Added for ErrorBoundary
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
    // Bind handlers for global errors
    this.handleGlobalError = this.handleGlobalError.bind(this);
    this.handleGlobalRejection = this.handleGlobalRejection.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error (React lifecycle):", error, errorInfo);
  }

  componentDidMount() {
    // Add global error listeners
    window.addEventListener("error", this.handleGlobalError);
    window.addEventListener("unhandledrejection", this.handleGlobalRejection);
  }

  componentWillUnmount() {
    // Clean up global error listeners
    window.removeEventListener("error", this.handleGlobalError);
    window.removeEventListener("unhandledrejection", this.handleGlobalRejection);
  }

  handleGlobalError(event) {
    // Prevent default error handling to allow ErrorBoundary to manage display
    event.preventDefault();
    console.error("Uncaught error (Global):", event.error || event.message || event);
    this.setState({ hasError: true, error: event.error || new Error(event.message || 'An unknown global error occurred.') });
  }

  handleGlobalRejection(event) {
    // Prevent default rejection handling to allow ErrorBoundary to manage display
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
    // STAGING ONLY BOOT BEACON
    console.log("[BOOT] main.tsx executing");
    if (!document.getElementById('boot-beacon')) {
        document.body.insertAdjacentHTML(
          "afterbegin",
          '<div id="boot-beacon" style="position:fixed;z-index:99999;top:4px;left:4px;padding:4px 6px;background:#111;color:#fff;font:12px/1.2 system-ui;border-radius:4px">BOOT</div>'
        );
    }
    // Global error listeners are now handled by the ErrorBoundary component itself.
    // Removed redundant listeners from here to avoid conflicts and simplify Layout.
    return () => {
      // No specific cleanup needed here for the boot beacon element.
    };
  }, []);

  // Add favicon to head - SHIELD ONLY
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
      // Re-enable notification fetching with the fix
      if (currentUser && currentUser.email) {
        const allUserNotifications = await Notification.filter({ user_email: currentUser.email }, '-created_at', 100); // Fetch more to accurately count unread
        const recentNotifications = allUserNotifications.slice(0, 5); // Display only recent 5 in dropdown
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
      // Note: For errors occurring within async operations that are not explicitly awaited
      // and whose promises are not handled, window.onunhandledrejection would typically catch them.
      // With the ErrorBoundary now listening globally, such errors would trigger the fallback UI.
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [location.pathname, location.search]); // More specific dependency

  const handleLogout = async () => {
    try {
      await User.signOut();
      setUser(null);
      navigate(createPageUrl("home"));
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      setUser(null);
      navigate(createPageUrl("home"));
    }
  };

  const handleLogin = async () => {
    // Using loginWithRedirect is more robust for session handling after login.
    await User.loginWithRedirect(window.location.href);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  const handleNotificationClick = async (notification) => {
    if (!notification.read_at) {
        await Notification.update(notification.id, { read_at: new Date().toISOString() });
        fetchUserData(); // Re-fetch to update count
    }
    if (notification.link_url) {
        navigate(notification.link_url);
    }
  };

  return (
    <ErrorBoundary>
        <style>{`
            /* Staging only CSS sanity */
            * { color: inherit; }
            body { background: #fff; color: #111; }
            #root { min-height: 100vh; }

            label.required::after {
                content: " *";
                font-size: 14px;
                font-weight: 700;
                color: #d92d20;
                margin-left: 2px;
            }
            *:focus-visible {
                outline: 3px solid rgba(59,130,246,.6) !important;
                outline-offset: 2px !important;
                border-color: transparent !important;
                box-shadow: none !important;
            }
            .btn-primary:hover { 
                filter: brightness(0.95); 
            }
        `}</style>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* Logo - SHIELD ONLY */}
                <Link to={createPageUrl("home")} className="flex items-center gap-2">
                <img 
                    src="/reporthere-logo.png" 
                    alt="ReportHere Logo" 
                    className="h-14 w-auto"
                />
                </Link>

                {/* Main Navigation (Desktop) */}
                <nav className="hidden lg:flex items-center space-x-1">
                <Link
                    to={createPageUrl("companies")}
                    className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium text-lg px-4 py-2 rounded-lg transition-colors"
                >
                    Companies
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium text-lg px-4 py-2">
                        Categories
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link to={createPageUrl("companies?category=technology")}>Technology</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to={createPageUrl("companies?category=retail")}>Retail</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to={createPageUrl("companies?category=finance")}>Finance</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to={createPageUrl("companies?category=healthcare")}>Healthcare</Link>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link
                    to={createPageUrl("blog")}
                    className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium text-lg px-4 py-2 rounded-lg transition-colors"
                >
                    Blog
                </Link>

                <Link
                    to={createPageUrl("about")}
                    className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium text-lg px-4 py-2 rounded-lg transition-colors"
                >
                    About
                </Link>

                {/* Admin Dashboard Link - Visible only for admin users on desktop */}
                {user && user.user_type === 'admin' && (
                    <Link
                    to={createPageUrl("admin-dashboard")}
                    className="text-gray-700 hover:text-green-700 hover:bg-green-50 font-medium text-lg flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                    >
                    <BriefcaseBusiness className="w-5 h-5" />
                    Admin
                    </Link>
                )}
                </nav>

                {/* Auth Buttons and User Menu */}
                <div className="flex items-center gap-3">
                {user ? (
                    <>
                    {/* Notification dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative hidden lg:flex">
                            <Bell className="w-5 h-5 text-gray-700 hover:text-green-600" />
                            {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                            )}
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.length > 0 ? (
                            notifications.map(n => (
                            <DropdownMenuItem key={n.id} onSelect={() => handleNotificationClick(n)} className={`cursor-pointer ${!n.read_at ? 'bg-green-50' : ''}`}>
                                <div className="flex items-start gap-2 py-1">
                                    {!n.read_at && <div className="mt-1 h-2 w-2 rounded-full bg-green-500 shrink-0" />}
                                    <div className="flex-1">
                                        <p className="text-sm font-medium leading-snug">{n.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                            ))
                        ) : (
                            <p className="px-2 py-4 text-center text-sm text-gray-500">No new notifications.</p>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to={createPageUrl("Notifications")} className="justify-center">View all notifications</Link>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <UserIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">{user.full_name?.split(' ')[0] || user.email}</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                            <p className="font-semibold">{user.full_name}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <DropdownMenuSeparator />

                        {/* User Dashboard */}
                        <DropdownMenuItem asChild>
                            <Link to={createPageUrl("dashboard")}>
                            <FileText className="w-4 h-4 mr-2" />
                            My Dashboard
                            </Link>
                        </DropdownMenuItem>

                        {/* Notifications */}
                        <DropdownMenuItem asChild>
                            <Link to={createPageUrl("Notifications")} className="flex items-center">
                            <Bell className="w-4 h-4 mr-2" />
                            Notifications
                            {unreadCount > 0 && <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{unreadCount}</span>}
                            </Link>
                        </DropdownMenuItem>

                        {/* Conditional Dashboard/Inbox Links for specific user types */}
                        {user.user_type === 'consumer' && (
                            <DropdownMenuItem asChild>
                            <Link to={createPageUrl("dashboard")}>
                                <FileText className="w-4 h-4 mr-2" />
                                My Complaints
                            </Link>
                            </DropdownMenuItem>
                        )}
                        {user.user_type === 'business' && (
                            <>
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl("business-dashboard")}>
                                <Building2 className="w-4 h-4 mr-2" />
                                Business Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl("company-inbox")}>
                                <FileText className="w-4 h-4 mr-2" />
                                Company Inbox
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl("billing")}>
                                <CreditCard className="w-4 h-4 mr-2" />
                                Billing
                                </Link>
                            </DropdownMenuItem>
                            </>
                        )}

                        {/* Admin Dashboard */}
                        {user.user_type === 'admin' && (
                            <>
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl("admin-dashboard")}>
                                <BriefcaseBusiness className="w-4 h-4 mr-2" />
                                Admin Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl("data-import")}>
                                <UploadCloud className="w-4 h-4 mr-2" />
                                Data Import
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to={createPageUrl("run-notifications")}>
                                <Send className="w-4 h-4 mr-2" />
                                Run Notifications
                                </Link>
                            </DropdownMenuItem>
                            </>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 focus:text-red-700">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {/* Temporary logout button - visible fix while debugging dropdown */}
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleLogout} 
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 ml-2"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleLogin} className="hover:bg-gray-100">
                        Sign In
                    </Button>
                    <div className="text-sm text-gray-600">
                        <Link
                        to={createPageUrl("ClaimProfile")}
                        className="text-green-600 hover:underline font-medium"
                        >
                        Are you a business? Claim your profile
                        </Link>
                    </div>
                    </div>
                )}

                {/* Mobile menu button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
                </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="space-y-2">
                <Link
                  to={createPageUrl("companies")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Companies
                </Link>
                <Link
                  to={createPageUrl("ClaimProfile")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Claim Your Profile
                </Link>
                <Link
                  to={createPageUrl("blog")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to={createPageUrl("about")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>

                {/* Conditional Mobile Links for logged-in users */}
                {user && (
                  <>
                    <Link
                      to={createPageUrl("dashboard")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to={createPageUrl("Notifications")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Notifications
                      {unreadCount > 0 && <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">{unreadCount}</span>}
                    </Link>
                  </>
                )}

                {user && user.user_type === 'consumer' && (
                  <Link
                    to={createPageUrl("dashboard")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Complaints
                  </Link>
                )}
                {user && user.user_type === 'business' && (
                  <>
                    <Link
                      to={createPageUrl("business-dashboard")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Business Dashboard
                    </Link>
                    <Link
                      to={createPageUrl("company-inbox")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Company Inbox
                    </Link>
                    <Link
                      to={createPageUrl("billing")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Billing
                    </Link>
                  </>
                )}
                {user && user.user_type === 'admin' && (
                  <>
                    <Link
                      to={createPageUrl("admin-dashboard")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to={createPageUrl("data-import")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Data Import
                    </Link>
                    <Link
                      to={createPageUrl("run-notifications")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Run Notifications
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-sm text-gray-600 flex items-center justify-between">
            <div>&copy; {new Date().getFullYear()} ReportHere. All rights reserved.</div>
            <div className="space-x-4">
              <Link to={createPageUrl("terms")} className="hover:underline">Terms</Link>
              <Link to={createPageUrl("privacy")} className="hover:underline">Privacy</Link>
              <Link to={createPageUrl("contact-us")} className="hover:underline">Contact Us</Link>
              <Link to={createPageUrl("faq")} className="hover:underline">FAQs</Link>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

