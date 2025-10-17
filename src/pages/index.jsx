import About from "./about.jsx";

import BusinessDashboard from "./business-dashboard.jsx";

import Layout from "./Layout.jsx";

import Home from "./Home";

import FileComplaint from "./FileComplaint";

import Companies from "./Companies";

import CompanyProfile from "./CompanyProfile";

import ClaimCompany from "./ClaimCompany";

import ClaimWizard from "./ClaimWizard";

import PostSignupSetup from "./PostSignupSetup";

import ChooseProfile from "./ChooseProfile";

import Terms from "./Terms";

import Privacy from "./Privacy";

import CompanyInbox from "./CompanyInbox";

import ModerationQueue from "./ModerationQueue";

import RunNotifications from "./RunNotifications";

import DataImport from "./DataImport";

import UserProfile from "./UserProfile";

import Search from "./Search";

import Sitemap from "./Sitemap";

import AdminAnalytics from "./AdminAnalytics";

import Blog from "./Blog";

import BlogPost from "./BlogPost";

import Feed from "./Feed";

import Billing from "./Billing";

import BillingSuccess from "./BillingSuccess";

import BillingCancel from "./BillingCancel";

import AdminDashboard from "./AdminDashboard";

import companies from "./companies";

import complaints from "./complaints";

import ComplaintDetail from "./ComplaintDetail";

import ContactUs from "./ContactUs";

import robots from "./robots";

import NotFound from "./NotFound";

import sitemap from "./sitemap";

import ClaimProfile from "./ClaimProfile";

import Notifications from "./Notifications";

import dashboard from "./dashboard";

import ClaimStart from "./ClaimStart";

import ClaimVerify from "./ClaimVerify";

import c from "./c";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    FileComplaint: FileComplaint,
    
    Companies: Companies,
    
    CompanyProfile: CompanyProfile,
    
    ClaimCompany: ClaimCompany,
    
    ClaimWizard: ClaimWizard,
    
    PostSignupSetup: PostSignupSetup,
    
    ChooseProfile: ChooseProfile,
    
    Terms: Terms,
    
    Privacy: Privacy,
    
    CompanyInbox: CompanyInbox,
    
    ModerationQueue: ModerationQueue,
    
    RunNotifications: RunNotifications,
    
    DataImport: DataImport,
    
    UserProfile: UserProfile,
    
    Search: Search,
    
    Sitemap: Sitemap,
    
    AdminAnalytics: AdminAnalytics,
    
    Blog: Blog,
    
    BlogPost: BlogPost,
    
    Feed: Feed,
    
    Billing: Billing,
    
    BillingSuccess: BillingSuccess,
    
    BillingCancel: BillingCancel,
    
    AdminDashboard: AdminDashboard,
    
    companies: companies,
    
    complaints: complaints,
    
    ComplaintDetail: ComplaintDetail,
    
    ContactUs: ContactUs,
    
    robots: robots,
    
    NotFound: NotFound,
    
    sitemap: sitemap,
    
    ClaimProfile: ClaimProfile,
    
    Notifications: Notifications,
    
    dashboard: dashboard,
    
    ClaimStart: ClaimStart,
    
    ClaimVerify: ClaimVerify,
    
    c: c,
    
    About: About,
    
    BusinessDashboard: BusinessDashboard,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/FileComplaint" element={<FileComplaint />} />
                
                <Route path="/Companies" element={<Companies />} />
                
                <Route path="/CompanyProfile" element={<CompanyProfile />} />
                
                <Route path="/ClaimCompany" element={<ClaimCompany />} />
                
                <Route path="/ClaimWizard" element={<ClaimWizard />} />
                
                <Route path="/PostSignupSetup" element={<PostSignupSetup />} />
                
                <Route path="/ChooseProfile" element={<ChooseProfile />} />
                
                <Route path="/Terms" element={<Terms />} />
                
                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/CompanyInbox" element={<CompanyInbox />} />
                
                <Route path="/ModerationQueue" element={<ModerationQueue />} />
                
                <Route path="/RunNotifications" element={<RunNotifications />} />
                
                <Route path="/DataImport" element={<DataImport />} />
                
                <Route path="/UserProfile" element={<UserProfile />} />
                
                <Route path="/Search" element={<Search />} />
                
                <Route path="/Sitemap" element={<Sitemap />} />
                
                <Route path="/AdminAnalytics" element={<AdminAnalytics />} />
                
                <Route path="/Blog" element={<Blog />} />
                
                <Route path="/BlogPost" element={<BlogPost />} />
                
                <Route path="/Feed" element={<Feed />} />
                
                <Route path="/Billing" element={<Billing />} />
                
                <Route path="/BillingSuccess" element={<BillingSuccess />} />
                
                <Route path="/BillingCancel" element={<BillingCancel />} />
                
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                
                <Route path="/companies" element={<companies />} />
                
                <Route path="/complaints" element={<complaints />} />
                
                <Route path="/ComplaintDetail" element={<ComplaintDetail />} />
                
                <Route path="/ContactUs" element={<ContactUs />} />
                
                <Route path="/robots" element={<robots />} />
                
                <Route path="/NotFound" element={<NotFound />} />
                
                <Route path="/sitemap" element={<sitemap />} />
                
                <Route path="/ClaimProfile" element={<ClaimProfile />} />
                
                <Route path="/Notifications" element={<Notifications />} />
                
                <Route path="/dashboard" element={<dashboard />} />
                
                <Route path="/ClaimStart" element={<ClaimStart />} />
                
                <Route path="/ClaimVerify" element={<ClaimVerify />} />
                
                <Route path="/c" element={<c />} />
                
                <Route path="/about" element={<about />} />
                
                <Route path="/business-dashboard" element={<BusinessDashboard />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
