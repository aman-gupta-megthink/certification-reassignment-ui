import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Certification Reassignment
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
