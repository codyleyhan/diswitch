import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';


import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { SwitchView } from './pages/Switch';
import { ContextButton } from './components/ContextButton';

import { SwitchContextProvider } from "./contexts/switch-context";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <SwitchContextProvider>
          <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">
              <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/create">
                    <Create />
                  </Route>
                  <Route path="/switches/:id">
                    <SwitchView />
                  </Route>
                </Switch>
                <ContextButton />  
              </Grid>
            </Box>
          </ChakraProvider>
        </SwitchContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
