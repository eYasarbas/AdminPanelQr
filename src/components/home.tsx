import React, {FC} from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Home:FC =()=>  {
    const navigate = useNavigate();


    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Hoş Geldiniz!
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
                Çalışan Yönetim Sistemi'ne hoş geldiniz. Aşağıdaki seçeneklerden birini kullanarak devam edebilirsiniz.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                {/* Çalışan Listesi */}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/employees')}
                >
                    Çalışanlar
                </Button>

                {/* Kullanıcı Listesi */}
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/users')}
                >
                    Kullanıcılar
                </Button>

                {/* Profil */}
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={() => navigate('/profile')}
                >
                    Profilim
                </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 5, color: 'text.secondary' }}>
                © 2024 Çalışan Yönetim Sistemi. Tüm hakları saklıdır.
            </Typography>
        </Container>
    );
}

export default Home;