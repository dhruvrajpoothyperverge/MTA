import {
  MovieInfoSummary,
  SelectDivContainer,
  RightArrow,
  StickyBottomContainer,
  Button,
} from "mta-components";

const Step1 = (props: any) => {
  const { moveToNext, selectDivData, selectedTheater, selectedSession } = props;

  return (
    <div>
      <div className="flex flex-col gap-4 px-5 pb-28">
        <MovieInfoSummary
          image={"/src/assets/spiderman.png"}
          title={"Kung Fu Panda 4"}
          productionName={"DreamWorks Animation"}
        />

        <SelectDivContainer data={selectDivData} />
      </div>

      <StickyBottomContainer>
        <Button
          text="Next"
          icon={<RightArrow />}
          onClick={() => moveToNext(1)}
          disabled={selectedTheater == "" || selectedSession == ""}
        />
      </StickyBottomContainer>
    </div>
  );
};

export default Step1;
