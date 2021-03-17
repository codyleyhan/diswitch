import React from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    useToast,
  } from '@chakra-ui/react';
  import {
    AddIcon,
  } from '@chakra-ui/icons';

import { SwitchContext, ADD_SWITCH } from '../contexts/switch-context';


export const CreateForm = props => {
    const [switches, dispatch] = React.useContext(SwitchContext);
    const [name, setName] = React.useState("");
    const [hostname, setHostname] = React.useState("");
    const toast = useToast();

    const onSubmit = e => {
        e.preventDefault();
        dispatch({
            type: ADD_SWITCH,
            payload: {
                name,
                hostname,
            }
        })
        setName("");
        setHostname("");
        toast({
            title: name + ' added!',
            description: "Successfully added switch " + name + ' at ' + hostname,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    }

    const hostnameInvalid = hostname !== '' && !hostname.startsWith('http')

    return <Flex width='full' align='center' justifyContent='center'>
        <Box p={2}>
            <Box textAlign='center'>
                <Heading>create new switch</Heading>
            </Box>
            <Box my={4} textAlign='left'>
                <form onSubmit={onSubmit}>
                    <FormControl isRequired>
                        <FormLabel>name</FormLabel>
                        <Input
                        placeholder='switch nickname'
                        size='md'
                        variant='flushed'
                        value={name}
                        isRequired
                        onChange={e => setName(e.target.value)} />
                    </FormControl>
                    <FormControl mt={6} isRequired>
                        <FormLabel>hostname</FormLabel>
                        <Input
                        placeholder='http://my-switch.local'
                        size='md'
                        variant='flushed'
                        value={hostname}
                        isInvalid={hostnameInvalid}
                        onChange={e => setHostname(e.target.value)} />
                    </FormControl>
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme='blue'
                        width="full"
                        mt={4}
                        isDisabled={name === '' || hostname === '' || hostnameInvalid}
                        type="submit"
                    />
                </form>
            </Box>
        </Box>
    </Flex>
  };
  