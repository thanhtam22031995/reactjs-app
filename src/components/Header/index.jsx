import { Button, Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { itemsCountSelector } from 'features/Cart/selector';
import { addSearchTerm } from 'features/Product/productSlice';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    alignItems: 'center',
    height: 70,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  sectionDesktop: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  link: {
    height: 60,
    width: 140,
    color: 'black',
    justifyContent: 'center',
    textDecoration: 'none',
    [theme.breakpoints.up('md')]: {
      height: 35,
      marginRight: 10,
      width: 100,
    },
  },
  iconMobile: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  iconDes: {
    color: 'black',
    textDecoration: 'none',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const typingTimeoutRef = useRef(null);
  const itemsCount = useSelector(itemsCountSelector);
  const dispatch = useDispatch();

  const handleOnChangeSearch = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const action = addSearchTerm({ q: value });
      dispatch(action);
    }, 500);
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push('/cart');
        }}
        className={classes.iconMobile}
      >
        <p>Cart</p>
        <Badge badgeContent={itemsCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </MenuItem>
      <MenuItem
        className={classes.link}
        onClick={() => {
          history.push('/');
        }}
      >
        Home
      </MenuItem>
      <MenuItem
        className={classes.link}
        onClick={() => {
          history.push('/products');
        }}
      >
        Shop
      </MenuItem>
      <MenuItem
        className={classes.link}
        onClick={() => {
          history.push('/products/addedit');
        }}
      >
        Add New
      </MenuItem>
      <MenuItem
        className={classes.link}
        onClick={() => {
          history.push('/contact');
        }}
      >
        Contact
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color="inherit" position="static">
        <Container>
          <Toolbar>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <Typography className={classes.title} variant="h6" noWrap>
                Nordic Shop
              </Typography>
            </NavLink>

            <div className={classes.grow} />
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
            <div className={classes.sectionDesktop}>
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
              <NavLink to="/cart" className={classes.iconDes}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={itemsCount} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </NavLink>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
