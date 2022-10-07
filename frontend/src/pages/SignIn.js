// import * as React from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// import logo from '../assets/logo-kmutt.png';

// const theme = createTheme();

// export default function SignIn() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <img src={logo} alt="logo" height="auto" width="350px" />
//           <Typography component="h1" variant="h5">
//             Please Sign In
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }


import * as React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import logo from '../assets/logo-kmutt.png';

export default function SimpleCard() {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      minH={'93.2vh'}
      align={'center'}
      justify={'center'}
      bgGradient='linear(to-r, #B5E0FB, #E3F3FD, #ECF7FE)'>

      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} align={'center'}>
        <Stack align={'center'} >
          <img src={logo} alt="logo" height="auto" width="350px" />
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
        </Stack>

        <Box
          borderRadius='15px' 
          boxShadow={'lg'}
          p={10}
          bgColor='white'>
          
          <Stack spacing={4}>

            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" 
              placeholder="Username"/>
            </FormControl>

            <FormControl>
            <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              </FormControl>

            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}