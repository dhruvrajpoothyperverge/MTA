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
  const navItems = [
    { icon: <Heart />, label: "Favorites", url: "/favorites" },
    { icon: <Home />, label: "Home", url: "/home" },
    { icon: <Ticket />, label: "Ticket", url: "/ticket" },
  ];

  const carouselData = [
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
  ];

  const newMovies = [
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
  ];

  return (
    <HomeContainer
      profilePic="/assets/kungfupanda.png"
      showBadge={true}
      fallback="https://example.com/default.jpg"
      navbarData={navItems}
    >
      <div className="flex flex-col gap-4 px-5 pb-24">
        <HeadingContainer label="Highlights">
          <Carousel data={carouselData} />
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
