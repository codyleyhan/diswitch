import React from 'react';
import {
    Box,
    IconButton,
  } from '@chakra-ui/react';
  import {
    AddIcon,
    ArrowBackIcon,
  } from '@chakra-ui/icons';
  import {
    Link,
    withRouter,
  } from 'react-router-dom';


export const ContextButton = withRouter(props => {
    console.log(props);
    const link = props.location.pathname === '/' ? '/create' : '/'
    const icon = props.location.pathname === '/' ? <AddIcon /> : <ArrowBackIcon />
    return <Box alignSelf='flex-end'  justifySelf='flex-end'>
        <Link to={link}>
        <IconButton variant='ghost' isRound icon={icon} size='lg' />
        </Link>
    </Box> 
  });
  