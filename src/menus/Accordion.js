import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/actions/lessons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  const makeAccordian = ({ name, lessons }) => {
    const currentUser = +window.sessionStorage.getItem("user_id");
    const formattedLessons = lessons.map((lesson) => {
      const completed = lesson.solutions.find(
        (solution) => solution.user_id === currentUser
      ) ? (
        <CheckBoxIcon />
      ) : (
        <CheckBoxOutlineBlankIcon />
      );
      return (
        <ListItem button key={lesson.name}>
          <Typography>
            <Link
              to={`/lessons/lesson/${lesson.id}`}
              className="sidemenu"
              onClick={() => {
                dispatch(actions.setLesson(lesson));
              }}
            >
              <span>{completed} &nbsp;</span>
              {lesson.name}
            </Link>
          </Typography>
        </ListItem>
      );
    });
    dispatch(actions.addSubject(name));
    return (
      <Accordion>
        <List>
          <ListItem button key="name">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              button
            >
              <Typography className={classes.heading}>{name}</Typography>
            </AccordionSummary>
          </ListItem>
        </List>
        <List>{formattedLessons}</List>
      </Accordion>
    );
  };

  const lessons = useSelector((state) => {
    return state.lesson.lessons;
  });
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      {lessons.map((lesson) => makeAccordian(lesson))}
    </div>
  );
}
