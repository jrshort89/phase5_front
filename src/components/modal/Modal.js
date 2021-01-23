import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as lessonActions from "../../redux/actions/lessons";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const lessonTests = useSelector(({ lesson }) =>
    lesson.lessonTests ? lesson.lessonTests : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const submitHandler = async () => {
    await dispatch(
      lessonActions.newLesson(
        {
          text: props.text,
          name: props.name,
          exercise: props.codeValue,
          solution: props.solution,
          test: props.test,
        },
        { subject: props.subject }
      )
    );
    history.push("/lessons");
  };

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.name}</h2>
      <h3 id="simple-modal-description">{props.subject}</h3>
      <p id="simple-modal-description">{props.text}</p>
      <p id="simple-modal-description">{props.codeValue}</p>
      <p id="simple-modal-description">{props.solution}</p>
      <p id="simple-modal-description">{props.test}</p>
      <p id="simple-modal-description">{lessonTests}</p>
      <Button variant="outlined" onClick={submitHandler}>
        Submit
      </Button>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.open}
        aria-labelledby={"simple-modal-title"}
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
