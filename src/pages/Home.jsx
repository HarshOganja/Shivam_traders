import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import AOS from "aos";
import "aos/dist/aos.css";
import "../index.css";
import TiltedCard from './TiltedCard';



function Home() {
  const [tilesData, setTilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    fetch("http://localhost:5000/api/Tiles_data")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setTilesData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Group tiles by category for UI rendering
  const groupedTiles = tilesData.reduce((acc, tile) => {
    if (!acc[tile.category]) acc[tile.category] = [];
    acc[tile.category].push(tile);
    return acc;
  }, {});

  // Sample slider images - you can replace with your Cloudinary URLs or dynamic images if needed
  const sliderImages = [
    { url: "https://res.cloudinary.com/dixkpd5w5/image/upload/v1749037663/2_t8gpjo.jpg" },
    { url: "https://res.cloudinary.com/dixkpd5w5/image/upload/v1749037663/0_qana0x.jpg" },
    { url: "https://res.cloudinary.com/dixkpd5w5/image/upload/v1749037662/1_bwdzdt.jpg" },
  {url:"https://res.cloudinary.com/dixkpd5w5/image/upload/v1749121607/16_z5nzdw.jpg"},
]

  // Determine slider height based on screen width
  const sliderHeight = windowWidth < 768 ? 300 : 800;

  if (loading) return <p>Loading tiles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="slider-container">
  <SimpleImageSlider
    width="100%"            // take full width of container
    height={sliderHeight}   // responsive height based on screen width
    images={sliderImages}
    showBullets={true}
    showNavs={true}
    autoPlay={true}
    autoPlayDelay={2.5}
    style={{ borderRadius: "18px", objectFit: "cover" }}
  />
</div>

      <section class="impression-section">
  <p class="impression-text animate-pop">FEEL THE ELEGANCE</p>
  <p class="impression-subtext animate-pop delay">Tiles that redefine spaces</p>
</section>

      {Object.entries(groupedTiles).map(([category, items]) => (
        <div data-aos="zoom-in" key={category}>
          <h2 className="category-heading">{category}</h2>
          <div className="scroll-row">
            {items.map((tile, idx) => (
              <TiltedCard
                imageSrc={tile.img}
                altText="Kendrick Lamar - GNX Album Cover"
                captionText={tile.company}
                containerWidth="auto"
                containerHeight="auto"
                imageHeight="auto"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                    {tile.name}
                  </p>
                }
              />

            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
