import {
  MovieInfoSummary,
  SelectDivContainer,
  RightArrow,
  StickyBottomContainer,
  Button,
} from "mta-components";
import { useMovieContext } from "../../context/MovieContext";

const Step1 = (props: any) => {
  const { moveToNext, selectDivData, selectedTheater, selectedSession } = props;
  const { currentMovie } = useMovieContext();

  return (
    <div>
      <div className="flex flex-col gap-4 px-5 pb-28">
        <MovieInfoSummary
          image={currentMovie?.videoThumbnail || ""}
          title={currentMovie?.title || ""}
          productionName={currentMovie?.productionHouse || ""}
        />

        <SelectDivContainer data={selectDivData} />
      </div>

      <StickyBottomContainer>
        <Button
          text="Next"
          icon={<RightArrow />}
          onClick={() => moveToNext(1)}
          disabled={selectedTheater === null || selectedSession === null}
        />
      </StickyBottomContainer>
    </div>
  );
};

export default Step1;
