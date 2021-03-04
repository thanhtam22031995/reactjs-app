import { Button, Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { itemsCountSelector } from '../../features/Cart/selector';
import { addSearchTerm } from '../../features/Product/productSlice';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 26,
    textDecoration: 'none',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  link: {
    marginRight: 10,
    color: 'black',
    textDecoration: 'none',
  },
}));

export default function Header() {
  const classes = useStyles();
  const typingTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  const handleOnChangeSearch = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const action = addSearchTerm({ name_like: value });
      dispatch(action);
    }, 500);
  };

  const itemsCount = useSelector(itemsCountSelector);
  return (
    <div className={classes.grow}>
      <AppBar color="inherit" position="static">
        <Container>
          <Toolbar>
            <NavLink to="/" className={classes.title}>
              NORDIC <span style={{ color: 'red' }}>CODER</span>
            </NavLink>

            <div className={classes.grow} />

            <NavLink to="/" className={classes.link}>
              <Button color="inherit">Home</Button>
            </NavLink>

            <NavLink to="/products" className={classes.link}>
              <Button color="inherit">Shop</Button>
            </NavLink>

            <NavLink to="/products/addedit" className={classes.link}>
              <Button color="inherit">Add New</Button>
            </NavLink>

            <NavLink to="/contact" className={classes.link}>
              <Button color="inherit">Contact</Button>
            </NavLink>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(e) => handleOnChangeSearch(e.target.value)}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <NavLink to="/cart" className={classes.link}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={itemsCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
