import React from 'react';

interface PageBannerProps {
  image: string;
  title: string;
  subtitle: string;
}

const srcsetUrl = (url: string) => url.replace(/ /g, '%20');

export const PageBanner: React.FC<PageBannerProps> = ({ image, title, subtitle }) => {
  const avif800 = srcsetUrl(image.replace(/\.webp$/i, '-800.avif'));
  const avif1600 = srcsetUrl(image.replace(/\.webp$/i, '.avif'));
  const webp800 = srcsetUrl(image.replace(/\.webp$/i, '-800.webp'));
  const webp1600 = srcsetUrl(image);

  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        imageSrcSet={`${avif800} 800w, ${avif1600} 1600w`}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <div className="page-banner text-white">
        <picture aria-hidden="true">
          <source
            type="image/avif"
            srcSet={`${avif800} 800w, ${avif1600} 1600w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${webp800} 800w, ${webp1600} 1600w`}
            sizes="100vw"
          />
          <img
            src={image}
            srcSet={`${webp800} 800w, ${webp1600} 1600w`}
            sizes="100vw"
            alt=""
            className="page-banner-bg"
            loading="eager"
            decoding="sync"
          />
        </picture>
        <div className="banner-content container">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
    </>
  );
};

export default PageBanner;
