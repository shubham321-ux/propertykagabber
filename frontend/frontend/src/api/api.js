import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // include cookies (JWT)
});

// Auth
export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function getCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data;
}

// Properties
export async function getProperties() {
  const res = await api.get("/properties");
  return res.data;
}

export async function getProperty(id) {
  const res = await api.get(`/properties/${id}`);
  return res.data;
}

export async function createProperty(formData) {
  const res = await api.post("/properties", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateProperty(id, formData) {
  const res = await api.put(`/properties/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteProperty(id) {
  const res = await api.delete(`/properties/${id}`);
  return res.data;
}

export async function deletePropertyImage(id, index) {
  const res = await api.delete(`/properties/${id}/images/${index}`);
  return res.data;
}

// Blogs
export async function getBlogs() {
  const res = await api.get("/blogs");
  return res.data;
}

export async function getBlog(id) {   // ✅ Single blog API
  const res = await api.get(`/blogs/${id}`);
  return res.data;
}

export async function createBlog(formData) {
  const res = await api.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateBlog(id, formData) {
  const res = await api.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteBlog(id) {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
}

// Contact Info
export async function getContact() {
  const res = await api.get("/contact");
  return res.data;
}

export async function createContact(data) {
  const res = await api.post("/contact", data);
  return res.data;
}

export async function updateContact(data) {
  const res = await api.put("/contact", data);
  return res.data;
}

export async function patchContact(data) {
  const res = await api.patch("/contact", data);
  return res.data;
}

// CMS Pages
export async function getPages() {
  const res = await api.get("/pages");
  return res.data;
}

export async function getPage(name) {
  const res = await api.get(`/pages/${name}`);
  return res.data;
}

export async function createPage(data) {
  const res = await api.post("/pages", data);
  return res.data;
}

export async function updatePage(name, data) {
  const res = await api.put(`/pages/${name}`, data);
  return res.data;
}

export async function deletePage(name) {
  const res = await api.delete(`/pages/${name}`);
  return res.data;
}

// Export instance
export default api;
