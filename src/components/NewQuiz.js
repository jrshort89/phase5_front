import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import QuizMenu from "../menus/QuizMenu";

export default function NewQuiz() {
  const { register, handleSubmit, errors, control, reset } = useForm();
  const [quiz, setQuiz] = useState([]);

  const onChangeQuiz = (quiz) => {
    setQuiz(quiz);
  };

  const onSubmitHandler = (data, e) => {
    return fetch("http://localhost:3000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
      body: JSON.stringify({ question: data, quiz: quiz }),
    })
      .then((data) => {
        if (data.status === 401) throw data;
        return data.json();
      })
      .catch((err) => {
        return alert(err.statusText);
      })
      .then((json) => console.log(json));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  };

  return (
    <div
      style={{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
      }}
    >
      <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
        <QuizMenu
          changeQuiz={onChangeQuiz}
          value={quiz}
          style={{ fontSize: "20px" }}
        />
        <Controller
          as={
            <TextField
              autoComplete="text"
              variant="outlined"
              required
              fullWidth
              id="text"
              label="Question"
              autoFocus
              inputRef={register}
              ref={register({
                required: true,
              })}
            />
          }
          name="text"
          control={control}
          rules={{ required: true }}
        />
        <Controller
          as={
            <TextField
              autoComplete="answer"
              variant="outlined"
              required
              fullWidth
              id="answer"
              label="Answer"
              autoFocus
              inputRef={register}
              ref={register({
                required: true,
              })}
            />
          }
          name="answer"
          control={control}
          rules={{ required: true }}
        />
        <Controller
          as={
            <TextField
              // autoComplete="answer"
              variant="outlined"
              required
              fullWidth
              id="option_one"
              label="Option One"
              autoFocus
              inputRef={register}
              ref={register({
                required: true,
              })}
            />
          }
          name="option_one"
          control={control}
          rules={{ required: true }}
        />
        <Controller
          as={
            <TextField
              autoComplete="optiontwo"
              variant="outlined"
              required
              fullWidth
              id="option_two"
              label="Option two"
              autoFocus
              inputRef={register}
              ref={register({
                required: true,
              })}
            />
          }
          name="option_two"
          control={control}
          rules={{ required: true }}
        />
        <Controller
          as={
            <TextField
              // autoComplete="answer"
              variant="outlined"
              required
              fullWidth
              id="option_three"
              label="Option three"
              autoFocus
              inputRef={register}
              ref={register({
                required: true,
              })}
            />
          }
          name="option_three"
          control={control}
          rules={{ required: true }}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
