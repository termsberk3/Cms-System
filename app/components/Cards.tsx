"use client"
import React from 'react'
import Grid from '@mui/material/Grid2';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/system';

import { styled } from '@mui/system';

const CardStyled = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: theme.palette.dark,
    },
  }));

const MediaStyled = styled(CardMedia)(({ theme }) => ({
    height: 300,
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
    fontSize: 18,
    fontWeight: 'bold',
}));

const DescriptionStyled = styled(Typography)(({ theme }) => ({
    fontSize: 14,
}));

const Cards = () => {
    return (
        < >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40vh',
            }}>
                <Grid container spacing={3} width={600}>
                    <Grid size={6}  >
                        <CardStyled>
                            <MediaStyled
                                image="path/to/your/user-image.jpg"
                                title="User Management"
                            />
                            <CardContent>
                                <TitleStyled gutterBottom variant="h5" component="h2">
                                    User Management
                                </TitleStyled>
                                <DescriptionStyled variant="body2" color="textSecondary" component="p">
                                    Manage users, assign roles and permissions, monitor user activity, and ensure the security of your website.
                                </DescriptionStyled>
                            </CardContent>
                        </CardStyled>
                    </Grid>
                    <Grid size={6}>
                        <CardStyled>
                            <MediaStyled
                                image="path/to/your/user-image.jpg"
                                title="User Management"
                            />
                            <CardContent>
                                <TitleStyled gutterBottom variant="h5" component="h2">
                                    User Management
                                </TitleStyled>
                                <DescriptionStyled variant="body2" color="textSecondary" component="p">
                                    Manage users, assign roles and permissions, monitor user activity, and ensure the security of your website.
                                </DescriptionStyled>
                            </CardContent>
                        </CardStyled>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Cards