// user can change their username and phone number
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import * as decode from "jwt-decode";

import { 
  FormDiv,
  Heading,
  Input,
  Button,
  Error
} from './StyledComponents'

const SubHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  opacity: 0.5;
  text-transform: uppercase;
  margin: 20px 0;
  text-align: center;
`;

const FlexContainer = styled.div`
  @media (min-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`;

const Info = styled.div`
  flex: 1;
  margin: 20px 0;
  text-align: center;
  line-height: 1rem;
`;

const Item = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0.5;
  text-transform: uppercase;
  margin: 0;
`;

const Value = styled.span`
  font-size: 1.17rem;
  font-weight: 500;
`;

export default props => {
  const [data, setData] = useState([]);
  const [key] = useState(decode(localStorage.token));
  const [url] = useState(
    `https://damp-ravine-25485.herokuapp.com/api/users/${key.sub}`
  );
  const [config] = useState({
    headers: {
      Authorization: localStorage.token
    }
  });

  useEffect(() => {
    axios
      .get(url, config)
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [config, url]);

  return (
    <>
      <Heading>Hello, {data.username}!</Heading>
      <FormDiv>
        <SubHeading>User Profile</SubHeading>
        <FlexContainer>
          <Info>
            <Value>{data.username}</Value>
            <Item>Username</Item>
          </Info>
          <Info>
            <Value>{data.phone_number}</Value>
            <Item>Phone Number</Item>
          </Info>
          <Info>
          <Value>{data.password}</Value>
            <Item>Password</Item>
          </Info>
         
        </FlexContainer>
      </FormDiv>

      <Formik
        initialValues={{ username: "", phone_number: "" }}
        validationSchema={yup.object().shape({
          username: yup.string().required(),
          phone_number: yup.string().required()
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => {
          let key = decode(localStorage.token);

          axios
            .put(`https://damp-ravine-25485.herokuapp.com/api/users/:id/${key.sub}`,
              values,
              config
            )
            .then(res => {
              setData(res.data);
              resetForm();
            })
            .catch(error => {
              console.log(error);
            });
        }}
        render={props => (
          <FormDiv onSubmit={props.handleSubmit}>
            <SubHeading>Update Profile</SubHeading>
            {props.touched.username && props.errors.username && (
              <Error>{props.errors.username}</Error>
            )}
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={props.handleChange}
            />

            {props.touched.phone_number && props.errors.phone_number && (
              <Error>{props.errors.phone_number}</Error>
            )}
            <Input
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              onChange={props.handleChange}
            />

            <Button type="submit">Update</Button>
          </FormDiv>
        )}
      />
    </>
  );
};
