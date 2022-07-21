import { useRouter } from 'next/router';
import styled from 'styled-components';

const Nav = styled.nav`
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1019;
    background-color: ${({ theme }) => theme.bg.header};
    display: flex;
    justify-content: space-between;
    height: 4rem;
    color: ${({ theme }) => theme.text.primary};
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.bg.header};
    border: none;
    color: ${({ theme }) => theme.text.header};
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.8rem;
    cursor: pointer;
    span {
        color: ${({ theme }) => theme.text.primary};
    }
`;
export const Header: React.FC<{
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    theme: string;
}> = ({ setTheme, theme }) => {
    const router = useRouter();

    return (
        <Nav>
            {router.pathname !== '/' && (
                <Button onClick={() => router.back()}>Back</Button>
            )}
            <h2>Movies</h2>
            <Button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                {theme === 'light' ? (
                    <span className='material-icons'>light_mode</span>
                ) : (
                    <span className='material-icons'>dark_mode</span>
                )}
            </Button>
        </Nav>
    );
};
