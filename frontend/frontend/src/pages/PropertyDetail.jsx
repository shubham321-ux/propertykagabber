import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProperty } from "../api/api";
import PageWrapper from "../components/PageWrapper";
import Seo from "../components/Seo";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import homeBg from "../assets/homePic.jpg";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [posterIndex, setPosterIndex] = useState(0);

  useEffect(() => {
    getProperty(id)
      .then((data) => setProperty(data))
      .catch((err) => console.error("Error fetching property:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <PageWrapper bgImage={homeBg}>
        <p className="text-center text-neutral-300 text-lg py-20">
          Loading property details...
        </p>
      </PageWrapper>
    );

  if (!property)
    return (
      <PageWrapper bgImage={homeBg}>
        <p className="text-center text-neutral-300 text-lg py-20">
          Property not found.
        </p>
      </PageWrapper>
    );

  const images =
    property.images?.map((img) => `${window.location.origin}${img}`) || [];

  const seoData = {
    title: `${property.title || "Property Details"} - MySite`,
    description: property.description?.slice(0, 150) || "Property detail page.",
    keywords:
      "property, real estate, apartment, villa, MySite, property details",
  };

  return (
    <PageWrapper bgImage={homeBg} overlayOpacity={0.75}>
      <Seo pageName="properties details" />


      <motion.section
        className="px-6 py-16 max-w-6xl mx-auto text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Title */}
        <h1 className="text-5xl font-heading font-bold mb-6 text-white text-center">
          {property.title}
        </h1>

        {/* Main Poster */}
        <div className="mb-8">
          {property.video && posterIndex === -1 ? (
            <video
              controls
              className="w-full h-[450px] object-cover rounded-xl backdrop-blur-md bg-white/10 border border-white/20"
              src={`${window.location.origin}${property.video}`}
            />
          ) : images.length > 0 ? (
            <div
              className="cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={images[posterIndex]}
                alt={property.title}
                className="w-full h-[450px] object-cover rounded-xl backdrop-blur-md bg-white/10 border border-white/20"
              />
            </div>
          ) : (
            <div className="w-full h-[450px] flex items-center justify-center rounded-xl bg-white/10 border border-white/20 text-neutral-300">
              No media available
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto mb-10">
          {property.video && (
            <div
              onClick={() => setPosterIndex(-1)}
              className={`h-24 w-36 flex items-center justify-center rounded-lg backdrop-blur-md bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition ${
                posterIndex === -1 ? "ring-2 ring-accent" : ""
              }`}
            >
              🎥 Video
            </div>
          )}
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${property.title} ${idx + 1}`}
              onClick={() => setPosterIndex(idx)}
              className={`h-24 w-36 object-cover rounded-lg backdrop-blur-md border border-white/20 cursor-pointer hover:opacity-80 transition ${
                posterIndex === idx ? "ring-2 ring-accent" : ""
              }`}
            />
          ))}
        </div>

        {/* Property Info Section */}
        <motion.div
          className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-xl text-neutral-100 max-w-5xl mx-auto hover:bg-white/20 transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg mb-4">
            <span className="font-semibold text-accent">Location:</span>{" "}
            {property.location || "Not specified"}
          </p>
          {property.price && (
            <p className="text-2xl font-bold text-accent mb-6">
              ₹ {property.price.toLocaleString()}
            </p>
          )}
          <p className="leading-relaxed text-neutral-200">
            {property.description || "No description available."}
          </p>
        </motion.div>

        {/* Lightbox */}
        {lightboxOpen && images.length > 0 && (
          <Lightbox
            mainSrc={images[posterIndex]}
            nextSrc={images[(posterIndex + 1) % images.length]}
            prevSrc={images[(posterIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setLightboxOpen(false)}
            onMovePrevRequest={() =>
              setPosterIndex(
                (posterIndex + images.length - 1) % images.length
              )
            }
            onMoveNextRequest={() =>
              setPosterIndex((posterIndex + 1) % images.length)
            }
          />
        )}
      </motion.section>
    </PageWrapper>
  );
}
