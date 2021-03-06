import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "../menus/Accordion";
import { Switch, Route, Link } from "react-router-dom";
import Lesson from "../components/Lesson";
import axios from "../axios";
import * as lessonActions from "../redux/actions/lessons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import * as loginActions from "../redux/actions/login";
import LessonForm from "../components/LessonForm";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Solutions from "../components/Solutions";
import QuizContainer from "../containers/Quizzes";
import GrainIcon from "@material-ui/icons/Grain";
import NewQuiz from "../components/NewQuiz";
import Home from "../components/Home";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const username = useSelector((state) => state.login.username);
  const lesson = useSelector((state) => state.lesson.lesson);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("/subjects").then((data) => {
      dispatch(lessonActions.setLessons(data.data));
    });
    // dispatch(lessonActions.setLesson())
  }, []);

  function logout() {
    fetch(`https://phase5-deploy.herokuapp.com/logout`, {
      method: "DELETE",
      // credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    if (typeof Storage !== undefined) {
      // sessionStorage.setItem("loggedIn", "false");
      sessionStorage.setItem("username", "");
      sessionStorage.setItem("user_id", "");
      dispatch(loginActions.setLoggedIn());
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link to="/lessons" className="sidemenu">
            <ListItemText primary={"Home"} />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GrainIcon />
          </ListItemIcon>
          <Link to="/lessons/quizzes" className="sidemenu">
            <ListItemText primary={"Quizzes"} />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <Link to="/lessons/solutions" className="sidemenu">
            <ListItemText primary={"Solutions"} />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <Link to="/lessons/newlesson" className="sidemenu">
            <ListItemText primary={"New Lesson"} />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <Link to="/lessons/newquiz" className="sidemenu">
            <ListItemText primary={"New Quiz"} />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Link to="/signin" className="sidemenu" onClick={logout}>
            <ListItemText primary={"Logout"} />
          </Link>
        </ListItem>
        <ListItem>
          <Accordion />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            className="font"
            style={{ fontSize: "20px", fontFamily: "inherit" }}
          >
            {lesson ? lesson.name : "Select a lesson to start coding!"}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/lessons" exact={true}>
            <Home />
            <div style={{ justifyContent: "center", display: "flex" }}>
              <img src="https://reactjs.org/logo-og.png" alt="React logo" />
            </div>
          </Route>
          <Route path="/lessons/lesson/:id" component={Lesson} id={props} />
          {/* <Route path="/lessons/lesson">
            <div>
              <Lesson />
            </div>
          </Route> */}
          <Route path="/lessons/newquiz">
            <NewQuiz />
          </Route>
          <Route path="/lessons/quizzes">
            <QuizContainer />
          </Route>
          <Route path="/lessons/newlesson">
            <LessonForm />
          </Route>
          <Route path="/lessons/solutions">
            <Solutions />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
