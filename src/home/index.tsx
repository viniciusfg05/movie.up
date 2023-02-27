import "../styles/global.scss";

import "../styles/sidebar.scss";
import "../styles//content.scss";
import { useContext } from "react";
import { MoviesContext } from "../context/moviesContect";
import { SideBar } from "../components/SideBar";
import { Content } from "../components/Content";

export function Home() {
  const {
    movies,
    selectedGenre,
    setSelectedGenreIdFunc,
    selectedGenreId,
    genres,
  } = useContext(MoviesContext);

  function handleClickButton(id: number) {
    setSelectedGenreIdFunc(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
}
