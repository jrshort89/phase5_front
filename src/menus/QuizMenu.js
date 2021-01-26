import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    axios.get("/quizzes").then((data) => setQuizzes(data.data));
  }, []);

  const handleChange = (event) => {
    setQuiz(event.target.value);
    props.changeQuiz(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl} required>
        <InputLabel id="demo-simple-select-helper-label">Quiz</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={quiz}
          onChange={handleChange}
        >
          {quizzes.map((name) => (
            <MenuItem value={name.name}>{name.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
