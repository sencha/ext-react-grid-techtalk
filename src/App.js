import React from 'react';
import { Container } from '@extjs/ext-react';
import StocksGrid from './StocksGrid';

export default function App() {
    return (
        <Container fullscreen layout="fit">
            <StocksGrid/>
        </Container>
    )
}

