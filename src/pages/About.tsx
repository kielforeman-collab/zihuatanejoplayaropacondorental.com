import React from 'react';
import RestaurantCard from '../components/RestaurantCard';

export const About: React.FC = () => {
  const restaurants = [
    {
      title: "Paty's Marymar",
      image: "images/patys-marymar-1.jpg",
      link: "https://patys-marymar.com/",
      description: "Paty's Marymar is located right on the beachfront of Playa La Ropa. It offers al fresco dining, full bar services, table service, wheelchair accessibility, and highchairs. Available for delivery and pickup.",
      quote: "My favourite casual eatery and bar on the beach. Healthy smoothies, breakfasts and lunches and casual evening dining. Also, there is YOGA in the upper salon most days of the week! Drop-in classes are available.",
    },
    {
      title: "La Gaviota",
      image: "images/la-gaviota-1.jpg",
      link: "https://www.tripadvisor.ca/Restaurant_Review-g150795-d1032486-Reviews-La_Gaviota-Zihuatanejo_Zihuatanejo_de_Azueta_Pacific_Coast.html",
      description: "La Gaviota is situated extremely close to the condo suite and sits right on the beach, making it ideal for sunset dinners. Features outside seating, full bar, credit card acceptance, free WiFi, and beachfront access. Family and dog friendly.",
      quote: "Possibly my favourite restaurant in Zihua, great service, every table has an amazing view and the food is wonderful!",
    },
    {
      title: "Jungle Pizza",
      image: "images/jungle-pizza-1.jpg",
      link: "https://www.tripadvisor.ca/Restaurant_Review-g150795-d1379281-Reviews-Jungle_Pizza-Zihuatanejo_Zihuatanejo_de_Azueta_Pacific_Coast.html",
      description: "Located just back from the beach across the street from the OXXO store. Jungle Pizza features delivery, takeout, outdoor seating, a full bar, and a welcoming jungle atmosphere.",
      quote: "The best pizza in town, the host Ruben is a great guy and very personable. Great place for a beer, pizza, and a salad. Ruben delivers too.",
    },
    {
      title: "Trattoria da Gianni",
      image: "images/trattoria-de-gianni-1.jpg",
      link: "https://www.tripadvisor.com/Restaurant_Review-g150795-d7747587-Reviews-Trattoria_da_Gianni_Zihuatanejo-Zihuatanejo_Zihuatanejo_de_Azueta_Pacific_Coast.html",
      description: "An excellent Italian bistro located on the access road just behind Playa La Ropa. Features indoor and cozy outdoor garden seating with a fine selection of pasta and wine.",
      quote: "Gianni's is an Italian bistro that offers a nice selection of menu items. Gianni is in most nights and is a great host.",
      secondaryLink: "https://www.facebook.com/trattoriadagiannizihuatanejo?mibextid=ZbWKwL",
      secondaryLinkLabel: "Visit Facebook Page",
    },
  ];

  return (
    <div className="page-about animate-fade-in">
      {/* Banner */}
      <div 
        className="page-banner text-white" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://www.zihuatanejoplayaropacondorental.com/images/webp2/bg Playa Ropa Beach.jpg")`
        }}
      >
        <div className="banner-content container">
          <h1>About Playa La Ropa</h1>
          <h2>Zihuatanejo, Mexico</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-main container">
        <div className="about-intro-grid">
          <div className="about-intro-text glass-panel">
            <h2>The Magic of Playa La Ropa</h2>
            <p>
              Playa La Ropa is widely considered one of the most beautiful and charming sandy beaches along Mexico's Pacific coast. 
              Its gentle waves, warm waters, and scenic bay views make it a paradise for families, swimmers, and outdoor enthusiasts.
            </p>
            <p>
              Depending on the season, you can witness stunning wildlife experiences, including pelicans diving for fish and local 
              sea turtle releases. For those looking for active adventures, options abound: paddle boarding, Hobie Cat rentals, 
              parasailing, jet-skiing, and water rides for kids are all readily accessible on the beach.
            </p>
          </div>
          
          <div className="about-intro-card bg-ocean-gradient text-white">
            <h3>Beach Information</h3>
            <ul className="info-list">
              <li><strong>Beach Type:</strong> Fine white sand, very swimmable</li>
              <li><strong>Distance:</strong> ~10 minutes walk down the hill</li>
              <li><strong>Water Temp:</strong> Broadly warm year-round</li>
              <li><strong>Activities:</strong> Snorkeling, sailing, paddle boarding, beach dining</li>
            </ul>
          </div>
        </div>

        {/* Restaurants Guide Section */}
        <section className="dining-guide">
          <div className="section-header">
            <h2>Local Dining Recommendations</h2>
            <p className="section-subtitle">
              Some of our favorite local spots to eat and drink right down the hill on or near Playa La Ropa.
            </p>
          </div>
          <div className="restaurant-grid">
            {restaurants.map((rest, idx) => (
              <RestaurantCard
                key={idx}
                title={rest.title}
                image={rest.image}
                link={rest.link}
                description={rest.description}
                quote={rest.quote}
                secondaryLink={rest.secondaryLink}
                secondaryLinkLabel={rest.secondaryLinkLabel}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default About;
