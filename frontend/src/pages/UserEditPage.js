import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUser } from "../redux/user/userActions";
import { USER_UPDATE_RESET } from "../redux/user/userTypes";
import FormContainer from "../components/FormContainer";

function UserEditPage({ match, history }) {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: successUpdate,
  } = userUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        history.push("/admin/userList");
      } else {
        if (user && (!user.name || user._id !== userId)) {
          dispatch(getUserDetails(userId));
        } else {
          if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
          }
        }
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userId, user, successUpdate,userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, { name, email, isAdmin }));
  };
  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1 className="mt-4 mb-4">Edit user</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditPage;
