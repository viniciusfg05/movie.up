import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

interface moviesProviderProps {
  children: ReactNode;
}

interface moviesContextProps {
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
  selectedGenreId: number;
  genres: GenreResponseProps[];
  isLoading: boolean;
  setSelectedGenreIdFunc: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export const MoviesContext = createContext({} as moviesContextProps);

export function MoviesProvider({ children }: moviesProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    useEffect(() => {
        const fetch = async () => {
          try {
            await api.get<GenreResponseProps[]>("genres").then((response) => {
              setGenres(response.data);
            });
          } catch (error) {
            console.log(error)
          } finally {
            console.log("concluido")
    
            setIsLoading(true)
          }
        };
    
        fetch();
    }, [])



  useMemo(() => {
    const fetch = async () => {
      await api
        .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
        .then((response) => {
          setMovies(response.data);
        });

      await api
        .get<GenreResponseProps>(`genres/${selectedGenreId}`)
        .then((response) => {
          setSelectedGenre(response.data);
        });
    };

    fetch();
  }, [selectedGenreId]);

  function setSelectedGenreIdFunc(id: number) {
    setSelectedGenreId(id);
  }
  console.log("render")
  return (
    <MoviesContext.Provider
      value={{
        movies,
        selectedGenre,
        setSelectedGenreIdFunc,
        selectedGenreId,
        genres,
        isLoading
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
