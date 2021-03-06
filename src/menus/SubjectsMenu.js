import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector } from "react-redux";

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
  const [age, setAge] = React.useState("");
  const subjects = useSelector((state) => state.lesson.subjects);
  const handleChange = (event) => {
    setAge(event.target.value);
    props.changeSubject(event);
  };

  return (
    <div>
      <FormControl className={classes.formControl} required>
        <InputLabel id="demo-simple-select-helper-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          onChange={handleChange}
        >
          {subjects.map((subject) => (
            <MenuItem value={subject}>{subject}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
