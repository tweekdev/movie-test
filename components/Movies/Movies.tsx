import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.text.primary};
    background-color: #ffffff;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
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
const MovieImage = styled.img`
    position: relative;
    width: 100%;
    height: 22rem;
    border-radius: 0.8rem;
`;
const TitleWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 1;
    opacity: 0;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;

const Title = styled.h3`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text.secondary};
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
            <Input
                placeholder='Search for a movie'
                onChange={(e) => setMovieName(e.target.value)}
                type='text'
            />
            <MoviesWrapper>
                {movies.length > 0 ? (
                    movies.map((movie: any) => (
                        <div key={movie.id}>
                            <Link href={`/movie/${movie.id}`}>
                                <MovieWrapper>
                                    <MovieImage
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    />
                                    <TitleWrapper>
                                        <Title id='title'>{movie.title}</Title>
                                    </TitleWrapper>
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
