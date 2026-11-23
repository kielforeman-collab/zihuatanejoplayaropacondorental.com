import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

interface RestaurantCardProps {
  title: string;
  image: string;
  link: string;
  description: string;
  quote: string;
  secondaryLink?: string;
  secondaryLinkLabel?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  title,
  image,
  link,
  description,
  quote,
  secondaryLink,
  secondaryLinkLabel,
}) => {
  return (
    <div className="restaurant-card glass-panel">
      <div className="restaurant-image-container">
        <picture>
          {/* srcset URLs must be percent-encoded (see ImageCarousel): the
              srcset parser takes the first whitespace-delimited token as
              the URL, so a spaced filename would make this source unusable
              and the browser would fall back to the JPEG. */}
          <source
            type="image/avif"
            srcSet={`${image.replace(/\.(jpg|jpeg)$/i, '-480.avif').replace(/ /g, '%20')} 480w, ${image.replace(/\.(jpg|jpeg)$/i, '.avif').replace(/ /g, '%20')} 800w`}
            sizes="(max-width: 768px) 100vw, 560px"
          />
          <img
            src={image}
            srcSet={`${image.replace(/\.(jpg|jpeg)$/i, '-480.jpg').replace(/ /g, '%20')} 480w, ${image.replace(/ /g, '%20')} 800w`}
            sizes="(max-width: 768px) 100vw, 560px"
            alt={title}
            className="restaurant-image"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="restaurant-rating">
          <Star size={16} fill="var(--secondary)" color="var(--secondary-dark)" />
          <Star size={16} fill="var(--secondary)" color="var(--secondary-dark)" />
          <Star size={16} fill="var(--secondary)" color="var(--secondary-dark)" />
          <Star size={16} fill="var(--secondary)" color="var(--secondary-dark)" />
          <Star size={16} fill="var(--secondary)" color="var(--secondary-dark)" />
        </div>
      </div>
      <div className="restaurant-content">
        <h3 className="restaurant-title">{title}</h3>
        <p className="restaurant-description">{description}</p>
        
        {quote && (
          <div className="restaurant-quote">
            <span className="quote-label">Nic says:</span>
            <p className="quote-text">"{quote}"</p>
          </div>
        )}

        <div className="restaurant-actions">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            Visit Website <ExternalLink size={14} style={{ marginLeft: '4px' }} />
          </a>
          {secondaryLink && secondaryLinkLabel && (
            <a
              href={secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ marginLeft: '10px' }}
            >
              {secondaryLinkLabel} <ExternalLink size={14} style={{ marginLeft: '4px' }} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;
