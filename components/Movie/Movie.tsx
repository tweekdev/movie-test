import { useEffect, useState } from 'react';
import styled from 'styled-components';

type Movie = {
    id: string;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
};

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text.primary};
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.bg.body};
    color: ${({ theme }) => theme.text.primary};
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
`;

const Img = styled.img`
    height: 17rem;
    margin-bottom: 1rem;
`;
export const Movie: React.FC<{ id: string }> = ({ id }) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'get',
                }
            );
            const dataJson = await data.json();
            setMovie(dataJson);
        };
        fetchData().catch(() => console.log('Error fetching data from API'));
    }, [id]);

    if (!movie) {
        return null;
    }

    return (
        <Wrapper>
            <div>
                <Title>{movie.title}</Title>
                <p>{movie.overview}</p>
                <p>{movie.vote_average}/10</p>
            </div>
            <Img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
            />
        </Wrapper>
    );
};
