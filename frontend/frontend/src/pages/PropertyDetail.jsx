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
      .catch(() => setProperty(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="py-24 text-center text-neutral-700 text-lg bg-neutral-50">
        Loading property details...
      </div>
    );

  if (!property)
    return (
      <div className="py-24 text-center text-neutral-700 text-lg bg-neutral-50">
        Property not found.
      </div>
    );

  const images = property.images?.map((img) => `${img}`) || [];

  return (
    <div className="bg-neutral-50 text-neutral-800 mt-22 py-10">
      <Seo pageName="Property Details" />

      {/* HEADER */}
      <motion.section
        className="max-w-4xl mx-auto px-4 text-center py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl md:text-3xl text-left md:text-center font-heading font-semibold text-gray-800  mb-3 leading-snug">
          {property.title}
        </h1>

        <p className="text-neutral-600 text-base md:text-lg text-left md:text-center">
          {property.location || "Location not specified"}
        </p>
      </motion.section>

      {/* MAIN MEDIA */}
      <motion.div
        className="max-w-5xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {property.video ? (
          <video
            controls
            className="w-full h-[340px] md:h-[450px] object-cover rounded-xl shadow-md border border-neutral-200"
            src={`${window.location.origin}${property.video}`}
          />
        ) : images.length > 0 ? (
          <img
            src={images[photoIndex]}
            alt={property.title}
            onClick={() => setLightboxOpen(true)}
            className="w-full h-[340px] md:h-[450px] object-cover rounded-xl shadow-md border border-neutral-200 cursor-pointer"
          />
        ) : (
          <div className="h-[340px] flex items-center justify-center rounded-xl bg-neutral-200 border border-neutral-300 text-neutral-600">
            No media available
          </div>
        )}
      </motion.div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="max-w-5xl mx-auto mt-5 flex gap-3 overflow-x-auto px-4 pb-10">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Property ${idx + 1}`}
              onClick={() => setPhotoIndex(idx)}
              className={`h-20 w-32 object-cover rounded-lg border cursor-pointer transition-all duration-300 ${
                photoIndex === idx
                  ? "ring-2 ring-primary scale-105"
                  : "hover:opacity-80"
              }`}
            />
          ))}
        </div>
      )}

{/* DETAILS */}
<motion.section
  className="max-w-4xl mx-auto px-6 py-12 mb-20 text-left bg-white shadow-sm rounded-2xl border border-neutral-200"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {property.price && (
    <p className="text-2xl font-semibold text-accent mb-5">
      ₹ {property.price.toLocaleString()}
    </p>
  )}

  <p className="text-base md:text-lg leading-relaxed text-neutral-700 mb-8">
    {property.description ||
      "No description available. Contact our team for more details about this property."}
  </p>

  <div className="border-t border-neutral-200 pt-6 mt-6 space-y-2 text-sm md:text-base text-neutral-700">
    <p>
      <strong>Type:</strong> {property.type || "Not specified"}
    </p>
    <p>
      <strong>Status:</strong> {property.status || "Available"}
    </p>
    <p>
      <strong>Bedrooms:</strong> {property.bedrooms || "N/A"} |{" "}
      <strong>Bathrooms:</strong> {property.bathrooms || "N/A"}
    </p>
    <p>
      <strong>Area:</strong>{" "}
      {property.area ? `${property.area} sq.ft.` : "N/A"}
    </p>
  </div>
</motion.section>


      {/* LIGHTBOX */}
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
