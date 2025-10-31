import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Properties = lazy(() => import("./pages/Properties"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const PageView = lazy(() => import("./pages/PageView"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Home = lazy(() => import("./pages/Home"));
const Aboutus = lazy(() => import("./pages/Aboutus"));

// Admin Pages
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AddProperty = lazy(() => import("./pages/admin/AddProperty"));
const ManageProperties = lazy(() => import("./pages/admin/ManageProperties"));
const AdminBlogs = lazy(() => import("./pages/admin/Blogs"));
const AdminContact = lazy(() => import("./pages/admin/Contact"));
const ManagePages = lazy(() => import("./pages/admin/ManagePages"));




// Public Layout
function PublicLayout() {
  return (
    <>
      <Header />
      <main role="main" className="site-container py-0">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pages/:name" element={<PageView />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/*" element={<PublicLayout />} />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<ManageProperties />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="properties" element={<ManageProperties />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="pages" element={<ManagePages />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
