import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector } from "react-redux";

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
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{name}</Typography>
        </AccordionSummary>
        <List>
          {console.log(lessons)}
          {lessons.map(({ subject, id }) => (
            <ListItem button>
              <Typography>
                <Link to={`/lessons/lesson/${id}`} className="sidemenu">
                  {subject}
                </Link>
              </Typography>
            </ListItem>
          ))}
        </List>
      </Accordion>
    );
  };

  const lessons = useSelector((state) => state.lesson.lessons);

  return (
    <div className={classes.root}>
      {lessons.map((lesson) => makeAccordian(lesson))}
    </div>
  );
}
