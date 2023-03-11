import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetailAction, selectRateAction } from "../Actions/MovieAction";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getImgUrl } from "../helpers";
import { Button, Select, Space } from "antd";

const MovieDetailsContainer = styled.div`
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: center;
`;

const MovieImg = styled.div`
  width: 400px;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MovieDetail = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
`;

const Overview = styled.div`
  max-height: 100px;
  /* overflow-y: scroll; */
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 30px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MovieDetails() {
  const [rating, setRating] = useState("");
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  // movieState.movieDetails.id = useParams();
  const params = useParams();

  useEffect(() => {
    dispatch(getMovieDetailAction(params.movieId));
  }, []);

  if (movieState.movieDetails.length === 0) {
    return <div></div>;
  }

  const handleSelectRating = (rating) => {
    setRating(rating);
  };

  const handleRate = (movieId) => {
    dispatch(selectRateAction(movieId, rating, movieState.sessionId));
  };

  const getAlert = () => {
    if (movieState.isLoggedin) {
      alert("Rate Success!");
    }
  };

  return (
    <MovieDetailsContainer>
      <MovieImg>
        <img
          src={getImgUrl(movieState.movieDetails.poster_path)}
          alt={movieState.movieDetails.title}
        />
      </MovieImg>
      <MovieDetail>
        <h1>{movieState.movieDetails.title}</h1>
        <br />
        <SectionTitle>Release Date: </SectionTitle>
        {movieState.movieDetails.release_date}
        <SectionTitle>Overview</SectionTitle>
        <Overview>{movieState.movieDetails.overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movieState.movieDetails.genres.map((genre) => {
            return <GenreItem key={genre.id}>{genre.name}</GenreItem>;
          })}
          {console.log(movieState.movieDetails)}
        </Container>
        <SectionTitle>Average Rating:</SectionTitle>
        <p>{movieState.movieDetails.vote_average}</p>
        <SectionTitle>Your Rating:</SectionTitle>
        <p>{rating}</p>
        <Container>
          <Select
            defaultValue="1"
            style={{
              width: 120
            }}
            onChange={handleSelectRating}
            options={[
              {
                value: "1",
                label: "1"
              },
              {
                value: "2",
                label: "2"
              },
              {
                value: "3",
                label: "3"
              },
              {
                value: "4",
                label: "4"
              },
              {
                value: "5",
                label: "5"
              },
              {
                value: "6",
                label: "6"
              },
              {
                value: "7",
                label: "7"
              },
              {
                value: "8",
                label: "8"
              },
              {
                value: "9",
                label: "9"
              },
              {
                value: "10",
                label: "10"
              }
            ]}
          />
          <Button
            onClick={() => {
              handleRate(movieState.movieDetails.id);
              getAlert();
            }}
          >
            Rate it!
            {console.log(movieState.movieDetails.id)}
          </Button>
        </Container>
        <SectionTitle>Production Companies</SectionTitle>
        <Container>
          {movieState.movieDetails.production_companies.map((company) => {
            return (
              <ProductionItem key={company.id}>
                <img src={getImgUrl(company.logo_path)} alt={company.name} />
              </ProductionItem>
            );
          })}
        </Container>
      </MovieDetail>
    </MovieDetailsContainer>
  );
}
