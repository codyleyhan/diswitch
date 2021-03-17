import React from 'react';
import {
    Box,
    Badge,
    Container,
    Flex,
    Heading,
    Spacer,
    VStack,
    useToast,
    IconButton,
    Switch,
    Text,
    Input,
} from '@chakra-ui/react';
import {
    DeleteIcon,
  } from '@chakra-ui/icons';
import {
    useParams,
    useHistory,
} from 'react-router-dom';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query'
import {
    getSwitchStatus,
    toggleSwitchStatus,
    getSwitchState,
} from '../apis/tasmota';

import { DELETE_SWITCH, SwitchContext, UPDATE_SWITCH } from '../contexts/switch-context';


export const SwitchView = props => {
    const [switches, dispatch] = React.useContext(SwitchContext);
    let { id } = useParams();

    const s = switches[id];
    const history = useHistory();
   
    const queryClient = useQueryClient();
    const toast = useToast();

    const { isLoading, error, data, dataUpdatedAt } = useQuery(
        ['switches', s.hostname, 'state'],
        () => getSwitchState(s.hostname),
        {
            refetchInterval: 15000,
        }
    );

    const mutation = useMutation(
        () => toggleSwitchStatus(s.hostname),
        {
            onSuccess: (result, variables, context) => {
                queryClient.setQueryData(['switches', s.hostname], result)
                queryClient.invalidateQueries(['switches', s.hostname, 'state'])
            },
            onError: (error, variables, context) => {
                toast({
                    title: "failed to toggle switch",
                    description: "failed because: " + error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
    );

    const hostnameValid = s.hostname.startsWith('http')

    const onHostnameChange = (e) => {
        if (e.target.value === '' || !e.target.value.startsWith('http')) {
            return
        }
        console.log('updating')
        dispatch({
            type: UPDATE_SWITCH,
            payload: {
                id: s.id,
                hostname: e.target.value,
            }
        })
    }
    const onNameChange = (e) => {
        if (e.target.value === '') {
            return
        }
        console.log('updating')
        dispatch({
            type: UPDATE_SWITCH,
            payload: {
                id: s.id,
                name: e.target.value,
            }
        })
    }

    const onDelete = () => {
        dispatch({
            type: DELETE_SWITCH,
            payload: s.id,
        })
        history.push("/")
    }

    return <Container>
        <Heading>
            <Input value={s.name} isInvalid={s.name === ''} size='xl' variant='unstyled' onChange={onNameChange} />
        </Heading>
        <VStack align='stretch' mt={5} divider={<Spacer/>}>
        <Flex>
            <Box>
                <Input
                size='lg'
                isInvalid={!hostnameValid}
                variant='unstyled'
                value={s.hostname}
                onChange={onHostnameChange}
                 />
            </Box>
        </Flex>
        {(!isLoading && !error) ? (
            <Flex>
            <Text>device time on last update: {data.Time}</Text>
        </Flex>
        ): null}
        {(!isLoading && !error && data.Wifi && data.Wifi.SSId) ? (
            <Flex>
            <Text>device wifi: {data.Wifi.SSId}</Text>
        </Flex>
        ): null}
        {(!isLoading && !error && data.Wifi && data.Wifi.Signal) ? (
            <Flex>
            <Text>wifi signal: {data.Wifi.Signal}</Text>
        </Flex>
        ): null}
        <Flex>
            <Text>last fetch at: {new Date(dataUpdatedAt).toUTCString()}</Text>
        </Flex>
        {isLoading || error ? (<Flex>
            {isLoading ? <Badge colorScheme="orange" mr={3}>fetching status</Badge> : null}
            {error && !isLoading ? <Badge colorScheme="orange" mr={3}>unknown status</Badge> : null}
        </Flex>) : null}
        <Flex>
            <Switch
                isDisabled={isLoading || error }
                colorScheme='green'
                size="lg"
                isChecked={(data && data.POWER === 'ON') || false}
                onChange={e => mutation.mutate()}
                 />
        </Flex>
        <Flex>
            <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={onDelete} />
        </Flex>
        </VStack>
    </Container>
  };
  