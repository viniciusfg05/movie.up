import { Button } from "./Button";
import { lazy, memo, Suspense } from "react";

// const Button = lazy(() =>
//   import("./Button").then(({ ScreensProductList }: any) => ({
//     default: ScreensProductList,
//   }))
// );

interface SideBarProps {
  genres: Array<{
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  }>;
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
}

export function SideBar({
  genres,
  selectedGenreId,
  buttonClickCallback,
}: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

export const ProductItem = memo(SideBar, (prevProps, nextProps) => {
  return (
    Object.is(prevProps.genres, nextProps.genres)
  )
})