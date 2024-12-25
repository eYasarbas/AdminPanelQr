import React, {ChangeEvent, FC, useState} from 'react';
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";
import {LoginRequest} from "../../models/users/LoginRequest";
import {loginAxios} from "../../services/userService";
import {useNavigate} from "react-router-dom";

const Login:FC= ()=> {
    const  [password,setPassword] = useState<string>("");
    const  [username,setUsername] = useState<string>("");
    const  [error,setError] = useState<string>();
    const  navigate = useNavigate()

    const  handleSubmit = async (event:React.FormEvent)=>{
        event.preventDefault();
        const loginRequest: LoginRequest = { username, password };
        try {
             const response = await loginAxios(loginRequest);
            localStorage.setItem("token",response.data.Token);
            navigate('/home')
        }catch (e){
            setError("Parola veya email Hatalı")
        }
        finally {
            setError(undefined)
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Giriş Yap
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Adresi"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Şifre"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Giriş Yap
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;