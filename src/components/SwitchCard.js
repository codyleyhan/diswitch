import React from 'react';
import {
    Badge,
    Box,
    Flex,
    Heading,
    LinkBox,
    LinkOverlay,
    Spacer,
    Switch,
    useToast,
  } from '@chakra-ui/react';
import {
    Link
} from 'react-router-dom';
  import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query'
import {
    getSwitchStatus,
    toggleSwitchStatus,
} from '../apis/tasmota';

export const SwitchCard = props => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const queryKey = ['switches', props.hostname];
    const { isLoading, error, data } = useQuery(
        queryKey,
        () => getSwitchStatus(props.hostname),
        {
            refetchInterval: 15000,
        }
    );

    const mutation = useMutation(
        () => toggleSwitchStatus(props.hostname),
        {
            onSuccess: (result, variables, context) => {
                queryClient.setQueryData(queryKey, result)
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

    return <LinkBox>
    <Flex>
        <Box p={2}>
            <LinkOverlay as={Link} to={'/switches/' + props.id}><Heading size="md">{props.name}</Heading></LinkOverlay>
        </Box>
        <Spacer />
        <Box>
            {isLoading ? <Badge colorScheme="orange" mr={3}>fetching status</Badge> : null}
            {error && !isLoading ? <Badge colorScheme="orange" mr={3}>unknown status</Badge> : null}
            <Switch
                isDisabled={isLoading || error || mutation.isLoading}
                colorScheme='green'
                size="lg"
                isChecked={data || false}
                onChange={e => mutation.mutate()}
                 />
        </Box>
        </Flex>
    </LinkBox>
  };
  