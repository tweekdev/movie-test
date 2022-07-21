import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Movie } from '../../components/Movie/Movie';

const Main = styled.main`
    background-color: ${({ theme }) => theme.bg.body};
    color: ${({ theme }) => theme.text.primary};
    height: calc(100vh - 4rem);
`;
const Show: NextPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    return (
        <Main>
            <Movie id={id} />
        </Main>
    );
};

export default Show;
