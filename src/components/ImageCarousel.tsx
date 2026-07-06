import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Minimize } from 'lucide-react';

interface Slide {
  url: string;
  caption: string;
}

const slides: Slide[] = [
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/2a. Welcome.webp', caption: 'Welcome to Casa OM del Sur' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/2. Punta Marina Entrance Sign.webp', caption: 'Punta Marina Entrance Sign' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/3. Punta Marina Complex.webp', caption: 'Punta Marina Complex' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/3a. Punta Marina Complex.webp', caption: 'Punta Marina Complex' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/30. Punta Marina complex and Pool-arrow.webp', caption: 'Punta Marina #103 Location' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/5. Patio.webp', caption: 'Main Patio' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/106. BBQ.webp', caption: 'Patio BBQ Area' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/107. BBQ.webp', caption: 'Patio BBQ Area' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/6. Patio dining area.webp', caption: 'Patio Dining Area' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/105. Beautiful view.webp', caption: 'Beautiful view from above the property' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/104. Beautiful view.webp', caption: 'Beautiful view overlooking Playa La Ropa' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/7. Living room.webp', caption: 'Living Room' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/8. Living room.webp', caption: 'Living Room' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/9. Living room.webp', caption: 'Living Room View' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/10. Living room cushions.webp', caption: 'Living Room Cushions' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/11. Living room and Kitchen.webp', caption: 'Living Room & Kitchen Layout' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/12. Living room.webp', caption: 'Spacious Living Room' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/13. Living room.webp', caption: 'Living Room Area' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/14. Kitchen bar.webp', caption: 'Kitchen Bar Counter' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/15. Kitchen.webp', caption: 'Galley Kitchen' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/16. bdrms 1 & 2 from hall.webp', caption: 'Bedrooms 1 & 2 Hallway' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/17. Master bedroom (2).webp', caption: 'Master Bedroom' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/18. Master Bedroom.webp', caption: 'Master Bedroom Suite' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/108. Comfy chair.webp', caption: 'Comfy Chair in Bedroom' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/19. Master Bedroom Ensuite.webp', caption: 'Master Bedroom Ensuite Bathroom' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/20. Patio from Master Bedroom.webp', caption: 'Patio View from Master Bedroom' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/101. Bedroom.webp', caption: 'King Bedroom 2' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/23. Ensuite bath %232.webp', caption: 'Ensuite Bathroom 2' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/103. Beautiful view.webp', caption: 'Beautiful View from King Bedroom 2' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/24. King Size Bedroom %233.webp', caption: 'King Bedroom 3' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/25. Ensuite Bath %233.webp', caption: 'Ensuite Bathroom 3' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/26. Ensuite bath %233 rainshower.webp', caption: 'Ensuite 3 Rain Shower' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/27. Patio in front of living room.webp', caption: 'Patio Area in Front of Living Room' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/28. Patio.webp', caption: 'Patio Seating' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/29. Quaint architecture and patio bar.webp', caption: 'Quaint Architecture and Patio Bar' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/31. Complex Swimming pool.webp', caption: 'Complex Swimming Pool' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/31a. Complex Swimming pool.webp', caption: 'Complex Swimming Pool View' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/32. Complex swimming pool and chaises.webp', caption: 'Complex Swimming Pool & Chaises' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/33. Swimming pool.webp', caption: 'Shared Swimming Pool' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/34. Playa Ropa Beach.webp', caption: 'Playa La Ropa Beach' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/100. Smiles on the beach.webp', caption: 'Enjoy restaurants and activities on Playa La Ropa' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/35. Playa Ropa Beach.webp', caption: 'Beautiful Playa La Ropa' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/36. Playa Ropa Beach.webp', caption: 'Sunny Beach Days' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/1. Sunset Playa Ropa.webp', caption: 'Stunning Sunset on Playa La Ropa' },
  { url: 'https://www.zihuatanejoplayaropacondorental.com/images/webp2/4. Welcome to Casa OM.webp', caption: 'Welcome to Casa OM del Sur' }
];

export const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const timeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Autoplay Logic
  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = window.setTimeout(nextSlide, 4000);
    }
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  };

  // Image load handler
  const handleImageLoaded = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className={`carousel-wrapper ${isFullscreen ? 'carousel-fullscreen' : ''}`}>
      <div 
        className="carousel-main"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides container */}
        <div className="carousel-slides-container">
          {slides.map((slide, index) => {
            const isCurrent = index === currentIndex;
            const isLoaded = loadedImages[index];

            // Only render current slide + adjacent slides for performance (preloading)
            const shouldRender = Math.abs(index - currentIndex) <= 2 || index === 0 || index === slides.length - 1;

            if (!shouldRender) return null;

            return (
              <div
                key={slide.url}
                className={`carousel-slide ${isCurrent ? 'slide-active' : ''}`}
                style={{ display: isCurrent ? 'block' : 'none' }}
              >
                {!isLoaded && (
                  <div className="carousel-spinner-container">
                    <div className="carousel-spinner"></div>
                  </div>
                )}
                <img
                  src={slide.url}
                  alt={slide.caption || 'Condo image'}
                  className={`carousel-image ${isLoaded ? 'image-loaded' : ''}`}
                  onLoad={() => handleImageLoaded(index)}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button className="carousel-arrow arrow-left" onClick={prevSlide} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        <button className="carousel-arrow arrow-right" onClick={nextSlide} aria-label="Next image">
          <ChevronRight size={24} />
        </button>

        {/* Controls Overlay */}
        <div className="carousel-controls-overlay">
          <div className="carousel-index">
            {currentIndex + 1} / {slides.length}
          </div>
          <div className="carousel-action-buttons">
            <button className="carousel-control-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className="carousel-control-btn" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Caption footer bar */}
      <div className="carousel-caption-bar">
        <p>{slides[currentIndex].caption || 'Casa OM del Sur View'}</p>
      </div>

      {/* Slide dots indicator */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'dot-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;
