import { useState, useEffect } from "react";

const images = [
  { src: "/assets/cereals-combo.jpeg", alt: "Breakfast Cereals Combo" },
  { src: "/assets/body-products.jpeg", alt: "Body Care Products" },
  { src: "/assets/skincare-combo.jpeg", alt: "Skincare Essentials" },
  { src: "/assets/pest-control.jpeg", alt: "Pest Control Products" },
  { src: "/assets/pest-control-2.jpg", alt: "TSWAYI Cockroach Killer" },
];

export function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-muted/30" data-testid="carousel-photos">
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-secondary w-6" : "bg-muted-foreground/50"
            }`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
