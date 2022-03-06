import React, {useState} from 'react';
import * as yup from 'yup'
import {useFormik} from "formik";
import axios from 'axios'
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import {useNavigate} from "react-router"

const api = axios.create({
    baseURL: `http://localhost:5000/`
})

function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const validationSchema = yup.object({
        username: yup.string("username must be a string").required("username is required"),
        password: yup.string("password must be a string").required("password is required")
    })
    const onSubmit = async () => {
        const user = {
            username: formik.values.username,
            password: formik.values.password
        }
        console.log("submitted")
        const res = await api.post('/login', formik.values)
        if (res === true){
            localStorage.setItem('user', JSON.stringify(user));
            navigate("chat/1");
        }
        else
            setError("username or password incorrect");
    }
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit,
        validationSchema
    })

    return (
        <Container>
            <Row>
                <h2>Login</h2>
            </Row>
            <Row>
                <Col md={{span: 4, offset: 4}}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Control type={"text"} name={"username"} value={formik.values.username}
                               placeholder={"username"} onChange={formik.handleChange}/>
                        <br/>
                        {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
                        <Form.Control type={"password"} name={"password"} value={formik.values.password}
                               placeholder={"password"} onChange={formik.handleChange}/>
                        {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
                        <Button type={"submit"}>Login</Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
}

export default Login;