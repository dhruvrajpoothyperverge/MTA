import { useEffect, useState } from "react";
import {
  HomeContainer,
  Heart,
  Home,
  Ticket,
  Carousel,
  HeadingContainer,
  Slider,
} from "mta-components";

const HomePage = () => {
  const [highlights, setHighlights] = useState<any>([]);
  const [newMovies, setNewMovies] = useState<any>([]);

  const navItems = [
    { icon: <Heart />, label: "Favorites", url: "/favorites" },
    { icon: <Home />, label: "Home", url: "/home" },
    { icon: <Ticket />, label: "Ticket", url: "/ticket" },
  ];

  const fetchHighlights = async () => {
    try {
      setHighlights([
        {
          label: "Spiderman",
          image: "/assets/spiderman.png",
          link: "/moviedetails/1",
        },
        {
          label: "Spiderman",
          image: "/assets/spiderman.png",
          link: "/moviedetails/2",
        },
        {
          label: "Spiderman",
          image: "/assets/spiderman.png",
          link: "/moviedetails/3",
        },
      ]);
    } catch (error) {
      console.error("Error fetching highlights:", error);
    }
  };

  const fetchNewMovies = async () => {
    try {
      setNewMovies([
        {
          image: "/assets/kungfupanda.png",
          link: "/moviedetails/1",
        },
        {
          image: "/assets/kungfupanda.png",
          link: "/moviedetails/1",
        },
        {
          image: "/assets/kungfupanda.png",
          link: "/moviedetails/1",
        },
      ]);
    } catch (error) {
      console.error("Error fetching new movies:", error);
    }
  };

  useEffect(() => {
    fetchHighlights();
    fetchNewMovies();
  }, []);

  return (
    <HomeContainer
      profilePic="/assets/kungfupanda.png"
      showBadge={true}
      fallback="https://example.com/default.jpg"
      navbarData={navItems}
    >
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Highlights">
          <Carousel data={highlights} />
        </HeadingContainer>

        <HeadingContainer label="New Movies">
          <Slider data={newMovies} />
        </HeadingContainer>

        <HeadingContainer label="Coming Soon">
          <Slider data={newMovies} />
        </HeadingContainer>

        <HeadingContainer label="Most Liked">
          <Slider data={newMovies} />
        </HeadingContainer>
      </div>
    </HomeContainer>
  );
};

export default HomePage;
