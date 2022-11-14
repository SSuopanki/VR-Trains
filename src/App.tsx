import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { useGeoCoder } from "./hooks/useGeoCoder";
import { useTrainQuery } from "./hooks/useTrainQuery";
import { TTrains } from "./types";

interface TCoordinates {
  coordinates: Array<number>;
}

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [lat, setLat] = useState(24.9382);
  const [lng, setLng] = useState(60.1698);
  const [trainNumber, setTrainNumber] = useState(0);

  const { data, isLoading, isError } = useTrainQuery();
  const { data: location, isLoading: loadingLocation } = useGeoCoder(lng, lat);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOnClick = ({ coordinates }: TCoordinates, number: number) => {
    setLat(coordinates[0]);
    setLng(coordinates[1]);
    setTrainNumber(number);
  };

  const FilteredData = () => {
    return (
      <>
        {data
          ?.filter((value) =>
            value.trainNumber.toString().includes(searchQuery)
          )
          .map(({ trainNumber, speed, location }: TTrains) => {
            return (
              <ListItem
                key={trainNumber}
                onClick={() => handleOnClick(location, trainNumber)}
              >
                <FirstColumn>{trainNumber}</FirstColumn>
                <Column>{speed}</Column>
                <Column>
                  {location.coordinates.map((coords) => {
                    return <div key={coords}>{coords}</div>;
                  })}
                </Column>
                <Column></Column>
                <Column></Column>
              </ListItem>
            );
          })}
      </>
    );
  };

  if (isLoading) return <div>loading..</div>;

  if (isError) return <div>Some error has occurred</div>;

  return (
    <div>
      <h1>VR-Train locations</h1>
      <Container>
        <ListContainer>
          <ListHeading>
            <Heading>Train number</Heading>
            <Heading>Speed (km/h)</Heading>
            <Heading>Location</Heading>
            <Heading>
              <SearchInput
                placeholder="search"
                type="search"
                onChange={handleChange}
              />
            </Heading>
          </ListHeading>

          <List>
            <FilteredData />
          </List>
        </ListContainer>
        {loadingLocation ? (
          <LocationInfoDiv>Loading location...</LocationInfoDiv>
        ) : (
          <LocationInfoDiv>
            <Heading>Train number: {trainNumber} </Heading>
            {location?.data.map((value) => {
              return (
                <div key={value.name}>
                  <div>{value.name}</div>
                  <div>Region: {value.region}</div>
                  <div>County: {value.county}</div>
                </div>
              );
            })}
          </LocationInfoDiv>
        )}
      </Container>
    </div>
  );
};

const ListContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 0.5rem;
  width: 60rem;
`;

const Container = styled.div`
  display: flex;
  height: 30rem;
`;

const ListHeading = styled.div`
  display: flex;
  border-bottom: 2px solid black;
`;

const Heading = styled.div`
  font-weight: bolder;
  font-size: larger;
  width: 10rem;
  text-align: start;
  margin-bottom: 0.6rem;
`;

const List = styled.div`
  overflow: auto;
  height: 27rem;
`;

const ListItem = styled.div`
  height: 3rem;
  display: table;
  &:hover {
    background-color: azure;
    cursor: pointer;
  }
`;

const Column = styled.div`
  width: 10rem;
  border-bottom: 1px solid black;
  display: table-cell;
  vertical-align: middle;
`;

const FirstColumn = styled(Column)`
  padding-left: 0.2rem;
`;

const SearchInput = styled.input`
  width: 10rem;
`;

const LocationInfoDiv = styled.div`
  margin-left: 2rem;
`;
