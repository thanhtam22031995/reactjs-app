import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LocalAtmSharpIcon from '@material-ui/icons/LocalAtmSharp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PinterestIcon from '@material-ui/icons/Pinterest';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { NavLink } from 'react-router-dom';

Footer.propTypes = {};
const useStyle = makeStyles({
  card: {
    display: 'flex',
    backgroundColor: '#ecf0f1',
    height: 100,
    alignItems: 'center',
    padding: 15,
    transition: 'all 0.35s',
    overflow: 'hidden',
    '&:hover': {
      marginTop: -5,
      borderRadius: 5,
      backgroundColor: '#bdc3c7',
      boxShadow: '0 24px 36px rgba(0,0,0,0.11)',
    },
    '&:hover $icon': {
      color: '#ED4C67',
      transform: 'scale(1.2)',
    },
  },
  icon: {
    color: '#e74c3c',
    fontSize: 36,
    marginRight: 10,
    transition: 'all 0.35s',
  },
  desc: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  subTitle: {
    fontSize: 12,
  },
  footerLink: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  footerLink1: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  link: {
    textDecoration: 'none',
    marginRight: 40,
    color: '#7f8c8d',
    '&:hover': {
      color: '#e74c3c',
    },
  },
  linkIcon: {
    textDecoration: 'none',
    marginLeft: 40,
    color: '#7f8c8d',
    '&:hover': {
      color: '#e74c3c',
    },
  },
});

function Footer(props) {
  const classes = useStyle();
  return (
    <Container>
      <Box mb={5} mt={10} paddingTop="70px" borderTop="1px solid #ecf0f1">
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <Box className={classes.card}>
              <LocalShippingIcon className={classes.icon} />
              <Box className={classes.desc}>
                <Typography className={classes.title}>FREE SHIPPING</Typography>
                <Typography className={classes.subTitle}>
                  Suffered Alteration in Some Form
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box className={classes.card}>
              <LocalAtmSharpIcon className={classes.icon} />
              <Box className={classes.desc}>
                <Typography className={classes.title}>CACH ON DELIVERY</Typography>
                <Typography className={classes.subTitle}>The Internet Tend To Repeat</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box className={classes.card}>
              <ReplayRoundedIcon className={classes.icon} />
              <Box className={classes.desc}>
                <Typography className={classes.title}>45 DAYS RETURN</Typography>
                <Typography className={classes.subTitle}>Making it Look Like Readable</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box className={classes.card}>
              <WatchLaterIcon className={classes.icon} />
              <Box className={classes.desc}>
                <Typography className={classes.title}>OPENING ALL WEEK</Typography>
                <Typography className={classes.subTitle}>08AM - 09PM</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mb={10}>
        <Grid container>
          <Grid item xs={12} sm={6} className={classes.footerLink}>
            <NavLink className={classes.link} to="/">
              Home
            </NavLink>
            <NavLink className={classes.link} to="/cart">
              Cart
            </NavLink>
            <NavLink className={classes.link} to="/contact">
              Contact Us
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} className={classes.footerLink1}>
            <NavLink to="#" className={classes.linkIcon}>
              <FacebookIcon />
            </NavLink>
            <NavLink to="#" className={classes.linkIcon}>
              <TwitterIcon />
            </NavLink>
            <NavLink to="#" className={classes.linkIcon}>
              <InstagramIcon />
            </NavLink>
            <NavLink to="#" className={classes.linkIcon}>
              <PinterestIcon />
            </NavLink>
            <NavLink to="#" className={classes.linkIcon}>
              <LinkedInIcon />
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Footer;
