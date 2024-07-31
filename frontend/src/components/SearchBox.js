import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const SearchBox = ({ history }) => {
  const [keyword, setKeyWord] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className="">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5 w-50 "
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
