import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProperty } from "../api/api";
import Seo from "../components/Seo";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    getProperty(id)
      .then((data) => setProperty(data))
      .catch((err) => console.error("Error fetching property:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="py-20 text-center text-neutral text-lg">
        Loading property details...
      </div>
    );

  if (!property)
    return (
      <div className="py-20 text-center text-neutral text-lg">
        Property not found.
      </div>
    );

  const images = property.images?.map((img) => `${img}`) || [];

  return (
    <div className="bg-white text-neutral-dark">
      <Seo pageName="property details" />

      {/* Title */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3">
          {property.title}
        </h1>
        <p className="text-neutral-dark text-lg">
          {property.location || "Location not specified"}
        </p>
      </motion.section>

      {/* Main Media */}
      <motion.div
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {property.video ? (
          <video
            controls
            className="w-full h-[500px] object-cover rounded-2xl shadow-card"
            src={`${window.location.origin}${property.video}`}
          />
        ) : images.length > 0 ? (
          <img
            src={images[photoIndex]}
            alt={property.title}
            onClick={() => setLightboxOpen(true)}
            className="w-full h-[500px] object-cover rounded-2xl shadow-card cursor-pointer"
          />
        ) : (
          <div className="h-[500px] flex items-center justify-center rounded-2xl bg-neutral-light border border-neutral text-neutral">
            No media available
          </div>
        )}
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="max-w-6xl mx-auto mt-6 flex gap-4 overflow-x-auto px-6 pb-8">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Property ${idx + 1}`}
              onClick={() => setPhotoIndex(idx)}
              className={`h-24 w-36 object-cover rounded-xl border cursor-pointer transition-all duration-300 ${
                photoIndex === idx
                  ? "ring-2 ring-primary scale-105"
                  : "hover:opacity-80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Details */}
      <motion.section
        className="max-w-5xl mx-auto px-6 py-16 text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {property.price && (
          <p className="text-3xl font-bold text-accent mb-6">
            ₹ {property.price.toLocaleString()}
          </p>
        )}
        <p className="text-lg leading-relaxed text-neutral-dark">
          {property.description || "No description available."}
        </p>
      </motion.section>

      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
}
