import { Box, Container, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './components/ContactForm';
import { addContact } from './contactSlice';

ContactFeature.propTypes = {};

const useStyle = makeStyles({
  desc: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'start',
    justifyContent: 'space-between',
    color: '#2c3e50',
  },
  form: {
    textAlign: 'start',
    color: '#2c3e50',
  },
  iconButton: {
    marginTop: 10,
    marginRight: 10,
    transition: '.2s ease-in-out',
    '&:hover': {
      marginTop: -5,
      boxShadow: '0px 15px 15px rgb(0 0 0 / 40%)',
    },
  },
  icon: {
    color: 'white',
  },
});

function ContactFeature(props) {
  const contacts = useSelector((state) => state.contact.contacts);
  const dispatch = useDispatch();
  const classes = useStyle();

  const handleFormSubmit = (values) => {
    const action = addContact(values);
    dispatch(action);
  };

  const contactsProp = { name: '', email: '', phone: '', city: '', address: '', ...contacts };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Container>
        <Box mt={5}>
          <Grid container spacing={3}>
            <Grid className={classes.desc} sm={12} md={6} item>
              <Typography component="h2" variant="h3">
                Contact Us
              </Typography>
              <Typography component="p" variant="body1">
                There are many ways to contact us. You may drop us a line, give us a call or send an
                email, choose what suits you the most.
              </Typography>
              <Box>
                <Typography>(800) 686-6688</Typography>
                <Typography>info.deercreative@gmail.com</Typography>
              </Box>
              <Box>
                <Typography>mm</Typography>
              </Box>
              <Box>
                <Typography>Open hours: 8.00-18.00</Typography>
                <Typography>Mon-Fri Sunday: Closed</Typography>
              </Box>
              <Box>
                <Typography component="h2" variant="h3">
                  Follow Us
                </Typography>
              </Box>
              <Box>
                <IconButton style={{ backgroundColor: '#3a61c9' }} className={classes.iconButton}>
                  <FacebookIcon className={classes.icon} />
                </IconButton>
                <IconButton style={{ backgroundColor: '#41a1f6' }} className={classes.iconButton}>
                  <TwitterIcon className={classes.icon} />
                </IconButton>
                <IconButton style={{ backgroundColor: '#e74c3c' }} className={classes.iconButton}>
                  <InstagramIcon className={classes.icon} />
                </IconButton>
                <IconButton style={{ backgroundColor: '#1a0dab' }} className={classes.iconButton}>
                  <LinkedInIcon className={classes.icon} />
                </IconButton>
              </Box>
            </Grid>
            <Grid className={classes.form} sm={12} md={6} item>
              <Typography component="h2" variant="h3">
                Get In Touch With Us!
              </Typography>
              <Typography>Fill out the form below to recieve a free and confidential.</Typography>
              <Box mt={3}>
                <ContactForm initialValues={contactsProp} onSubmit={handleFormSubmit} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default ContactFeature;
