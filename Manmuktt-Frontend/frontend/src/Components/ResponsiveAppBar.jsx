import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
  const isLoggedIn = !!localStorage.getItem("userDetails"); 
  const userinfo = JSON.parse(localStorage.getItem("userDetails")) || {};
  console.log(userinfo)
  const userName = userinfo?.userName || null; 

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              onClick={""}
              sx={{
                p: 0,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Mannmuktt"
                src="/assets/mannmuktt logo.png"
                style={{ height: 40, width: "auto" }}
                sx={{ display: "flex", mr: 0 }}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "flex", lg: "none" },
              order: { xs: 2, lg: 1 },
            }}
          >
            <IconButton
              size="large"
              aria-label="Menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link
                      to={page.path}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          color: "#000",
                          fontFamily: "Overpass, sans-serif",
                          fontSize: "16px",
                          fontWeight: 700,
                          lineHeight: "20.26px",
                          textAlign: "left",
                          textTransform: "none",
                        }}
                      >
                        {page.name}
                      </Typography>
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.name}
                to={page.path}
                style={{
                  textDecoration: "none",
                  color: "black",
                  my: 2,
                  display: "block",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#000",
                    fontFamily: "Overpass, sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "20.26px",
                    textAlign: "left",
                    textTransform: "none",
                    margin: 1,
                  }}
                >
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* Conditional Rendering for Login/Signup or Username */}
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              gap: 1,
              order: { xs: 1, lg: 2 },
            }}
          >
            {!isLoggedIn ? (
              <>
                <Link to="/#" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      backgroundColor: "#FFFFFF",
                      height: "39px",
                      padding: "9px 15px",
                      borderRadius: "19.5px",
                      display: "flex",
                      justifyContent: "flex-start",
                      border: "1px solid black",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#d2d2d2",
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: "#000",
                        fontFamily: "Overpass, sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        textAlign: "left",
                        textTransform: "none",
                      }}
                    >
                      Login
                    </Typography>
                  </Button>
                </Link>

                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      backgroundColor: "#0097B2",
                      height: "39px",
                      padding: "9px 15px",
                      borderRadius: "19.5px",
                      display: "flex",
                      justifyContent: "flex-start",
                      border: "none",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#007a8c",
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: "#FFFFFF",
                        fontFamily: "Overpass, sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        textAlign: "left",
                        textTransform: "none",
                      }}
                    >
                      Get started
                    </Typography>
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    backgroundColor: "#0097B2",
                    height: "39px",
                    padding: "9px 15px",
                    borderRadius: "19.5px",
                    display: "flex",
                    justifyContent: "flex-start",
                    border: "none",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#007a8c",
                    },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Overpass, sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      textAlign: "left",
                      textTransform: "none",
                    }}
                  >
                    {userName} {/* Display user's name */}
                  </Typography>
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
