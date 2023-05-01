import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import GradingIcon from "@mui/icons-material/Grading";
import PropTypes from "prop-types";

const drawerWidth = 240;

export default function AppDrawer({ children, setMenu }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem
            key="ADD_FOOD"
            disablePadding
            onClick={() => setMenu("ADD_FOOD")}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Food" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="FOOD_LIST"
            disablePadding
            onClick={() => setMenu("FOOD_LIST")}
          >
            <ListItemButton>
              <ListItemIcon>
                <LocalDiningIcon />
              </ListItemIcon>
              <ListItemText primary="Food List" />
            </ListItemButton>
          </ListItem>
          <ListItem
            key="ORDER_LIST"
            disablePadding
            onClick={() => setMenu("ORDER_LIST")}
          >
            <ListItemButton>
              <ListItemIcon>
                <GradingIcon />
              </ListItemIcon>
              <ListItemText primary="Order List" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          bgcolor: "pink",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

AppDrawer.propTypes = {
  children: PropTypes.element,
};
