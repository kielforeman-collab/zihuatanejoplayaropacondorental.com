import React from 'react';
import { Link } from 'react-router-dom';

// Single source of truth: the visible Q&As and the FAQPage JSON-LD below
// are generated from this same array, so they can never drift apart.
const FAQS: { q: string; a: string }[] = [
  {
    q: 'How much does it cost to rent Casa OM del Sur for a week?',
    a: 'Weekly rates run $1,000–$2,500 USD, depending on the season: High Season is December–April and Low Season is May–November. The exact price depends on your dates and occupancy — contact the host for a quote.',
  },
  {
    q: 'What is the minimum stay?',
    a: 'One week. Casa OM del Sur is a weekly vacation rental, so nightly stays are not available.',
  },
  {
    q: 'How many guests can the condo sleep?',
    a: 'Up to 6 guests, in three king bedrooms.',
  },
  {
    q: 'What is included in the weekly rate?',
    a: 'All bed linens, bath towels, and beach towels; access to the complex swimming pool and chaises; a fully equipped galley kitchen with air fryer; water, gas, and electricity; complex maintenance and a night security guard; and high-speed WiFi.',
  },
  {
    q: 'Are there additional fees?',
    a: 'Yes: a $350 cleaning fee per week, a $1,000 refundable damage deposit, and a $2,000 CAD reservation deposit.',
  },
  {
    q: 'How do I book Casa OM del Sur?',
    a: 'There is no online booking system. Contact host Oscar Mario Sanchez through the inquiry form, by email at info@puntamarinazihuatanejo.com, or by phone or WhatsApp at +52 755 103 6035. Reservations are finalized once your deposit is received.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancellation, refund, and maximum-guest details are provided with your custom quote — ask the host when you inquire.',
  },
  {
    q: 'How far is the condo from Playa La Ropa beach?',
    a: 'About a 10-minute walk down the hill, including 74 steps, to the sandy beach.',
  },
  {
    q: 'What are the bedrooms and bathrooms like?',
    a: 'Three king bedrooms, each with its own private ensuite bathroom with a rain shower.',
  },
  {
    q: 'When can we check in and out?',
    a: 'Check-in and check-out times are flexible by arrangement.',
  },
];

export const Faq: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="page-faq">
      {/* Markdown version of this page (llms.txt v2); React hoists it to <head>. */}
      <link rel="alternate" type="text/markdown" href="/faq.md" />
      {/* FAQPage structured data; rendered from the same Q&As as the visible page. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Banner */}
      <div
        className="page-banner text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/images/1.%20Sunset%20Playa%20Ropa.webp")`
        }}
      >
        <div className="banner-content container">
          <h1>Frequently Asked Questions</h1>
          <h2>Renting Casa OM del Sur</h2>
        </div>
      </div>

      <div className="faq-main container">
        <p className="faq-intro">
          Everything guests usually ask before booking our Playa La Ropa vacation rental —
          weekly rates, deposits, what is included, and how to book.
        </p>
        <div className="faq-list">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="faq-item glass-panel">
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
        <p className="faq-cta">
          Still have a question? <Link to="/contact">Ask the host</Link> — Oscar Mario Sanchez
          replies to every inquiry.
        </p>
      </div>
    </div>
  );
};
export default Faq;
