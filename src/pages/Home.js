import React from 'react';
import {
    Container,
    Heading,
    StackDivider,
    VStack,
} from '@chakra-ui/react';
import { SwitchCard } from '../components/SwitchCard';

import { SwitchContext } from '../contexts/switch-context';


export const Home = props => {
    const [switches, dispatch] = React.useContext(SwitchContext);

    const cards = switches.map(s => {
        return <SwitchCard name={s.name} key={s.id} hostname={s.hostname} id={s.id}></SwitchCard>
    })

    return <Container>
        <Heading>switches</Heading>
        <VStack align='stretch' divider={<StackDivider />}>
        {cards}
        </VStack>
    </Container>
  };
  