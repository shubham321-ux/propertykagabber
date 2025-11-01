import { Suspense } from "react";

// Skeleton shimmer loader
function ImageSkeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-neutral-light rounded-sm ${className}`}
    ></div>
  );
}

// Actual image loader
function ActualImage({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`transition-opacity duration-500 ease-in-out ${className}`}
    />
  );
}

// LazyImage with Suspense fallback
export default function LazyImage({ src, alt, className }) {
  return (
    <Suspense fallback={<ImageSkeleton className={className} />}>
      <ActualImage src={src} alt={alt} className={className} />
    </Suspense>
  );
}
