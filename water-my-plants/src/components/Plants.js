// create watering schedule
import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik } from "formik";
import * as yup from "yup";

import { FormDiv, Heading, Input, Button, Error } from "./StyledComponents";

const NewPlant = ({ errors, touched, status }) => {
  const [newPlant, addNewPlant] = useState([]);

  useEffect(() => {
    if (status) {
      addNewPlant([...newPlant, status]);
    }
  }, [newPlant, status]);

  return (
    <>
      <Heading>Add a Plant</Heading>
      <FormDiv>
        {touched.nickname && errors.nickname && (
          <Error className="error">{errors.nickname}</Error>
        )}
        <Input type="text" name="nickname" placeholder="Plant Name" />

        {touched.species && errors.species && (
          <Error className="error">{errors.species}</Error>
        )}
        <Input type="text" name="species" placeholder="Species" />

        {touched.h2o_frequency && errors.h2o_frequency && (
          <Error className="error">{errors.h2o_frequency}</Error>
        )}
        <Input type="text" name="h2o_frequency" placeholder="Water Schedule" />

        {touched.user_id && errors.user_id && (
          <Error className="error">{errors.user_id}</Error>
        )}
        <Input type="text" name="user_id" placeholder="Nickname" />

        <Button type="submit">Submit</Button>
      </FormDiv>
    </>
  );
};

export default withFormik({
  mapPropsToValues: values => {
    return {
      nickname: values.nickname || "",
      species: values.species || "",
      h2o_frequency: values.h2o_frequency || "",
     //image: values.image|| "",
      user_id: values.user_id|| ""

    };
  },
  validationSchema: yup.object().shape({
    nickname: yup.string().required("Add plant name"),
    species: yup.string().required("What is the species?"),
    h2o_frequency: yup.string().required("Make a Schedule"),
    user_id: yup.string().required("Nickname")

  }),
  handleSubmit: (values, { props, setStatus, resetForm }) => {
    axios
        .post("https://damp-ravine-25485.herokuapp.com/api/plants",

//api-url/plants
        values)
      .then(response => {
        console.log(response.data);
        setStatus(response.data);
        resetForm();
        return props.history.push("/home");
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
})(NewPlant);
