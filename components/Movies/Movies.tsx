import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
    width: 100%;
    input {
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-bottom: 1px solid ${({ theme }) => theme.text.primary};
        background-color: ${({ theme }) => theme.bg.body};
        color: ${({ theme }) => theme.text.primary};
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }
`;
const MoviesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 15rem));
    justify-content: space-evenly;
    align-content: space-between;
    align-items: start;
    padding: 2rem 10rem;
    grid-gap: 2rem 0;
`;

const MovieWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h3`
    position: absolute;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text.primary};
    position: absolute;
    top: 50%;
    z-index: 1;
    visibility: hidden;
`;
const MovieImage = styled.img`
    position: relative;
    width: 100%;
    height: 22rem;
    border-radius: 0.8rem;

    &:hover {
        cursor: pointer;
        opacity: 0.4;
        #title {
            visibility: visible;
        }
    }
`;

export const Movies: React.FC = () => {
    const [movies, setMovies] = useState([]);
    const [movieName, setMovieName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = movieName
                ? await fetch(
                      `https://api.themoviedb.org/3/search/movie?api_key=${
                          process.env.NEXT_PUBLIC_API_KEY
                      }&query=${encodeURIComponent(movieName)}`,
                      {
                          headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                          },
                          method: 'get',
                      }
                  )
                : await fetch(
                      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                      {
                          headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                          },
                          method: 'get',
                      }
                  );
            const dataJson = await data.json();
            setMovies(dataJson.results);
        };

        fetchData().catch(() => console.log('Error fetching data from API'));
    }, [movieName]);

    return (
        <div>
            <InputWrapper>
                <input
                    placeholder='Search for a movie'
                    onChange={(e) => setMovieName(e.target.value)}
                    type='text'
                />
            </InputWrapper>
            <MoviesWrapper>
                {movies.length > 0 ? (
                    movies.map((movie: any) => (
                        <div key={movie.id}>
                            <Link href={`/movie/${movie.id}`}>
                                <MovieWrapper>
                                    <MovieImage
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    />
                                    <Title id='title'>{movie.title}</Title>
                                </MovieWrapper>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No results...</p>
                )}
            </MoviesWrapper>
        </div>
    );
};
