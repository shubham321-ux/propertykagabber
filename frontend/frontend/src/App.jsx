import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Properties from "./pages/Properties";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import PageView from "./pages/PageView";

import Dashboard from "./pages/admin/Dashboard";
import AddProperty from "./pages/admin/AddProperty";
import ManageProperties from "./pages/admin/ManageProperties";
import AdminBlogs from "./pages/admin/Blogs";
import AdminContact from "./pages/admin/Contact"; 
import ManagePages from "./pages/admin/ManagePages";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Public layout with header, footer, and site-container
function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="site-container min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Properties />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <PublicLayout>
              <Blogs />
            </PublicLayout>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <PublicLayout>
              <BlogDetail />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/pages/:name"
          element={
            <PublicLayout>
              <PageView />
            </PublicLayout>
          }
        />

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
    </BrowserRouter>
  );
}

export default App;
