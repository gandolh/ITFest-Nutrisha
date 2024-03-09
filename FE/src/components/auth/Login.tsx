import {
	Paper,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Text,
	Anchor,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { LoginCall } from "../../apiCallers/AuthApiCaller";

import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			loggedIn: false,
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email",
			password: (value) =>
				value.length >= 8 ? null : "Password is too short",
		},
	});

	const HandleLogin = () => {
		const output = form.validate();
		if (output.hasErrors == true) return;
		LoginCall(form.values.email, form.values.password);
	};

	// Google Login
	const [user, setUser] = useState<any>([]);

	const HandleGoogleLogin = () => {
		login();
	};

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => {
			setUser(codeResponse);
			console.log(codeResponse);
		},
		onError: (error) => console.log("Login Failed:", error),
	});

	useEffect(() => {
		if (user) {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [user]);

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Title
					order={2}
					className={classes.title}
					ta="center"
					mt="md"
					mb={50}
				>
					Welcome back to Nutrition-Assistant!
				</Title>

				<TextInput
					label="Email address"
					placeholder="hello@gmail.com"
					size="md"
					{...form.getInputProps("email")}
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					mt="md"
					size="md"
					{...form.getInputProps("password")}
				/>
				<Checkbox
					label="Keep me logged in"
					mt="xl"
					size="md"
					{...form.getInputProps("loggedIn")}
				/>
				<Button
					fullWidth
					mt="xl"
					size="md"
					onClick={HandleLogin}
					type="button"
				>
					Login
				</Button>
				<Button
					fullWidth
					mt="xl"
					size="md"
					onClick={HandleGoogleLogin}
					type="button"
				>
					Sign in with Google
				</Button>

				<Text ta="center" mt="md">
					Don&apos;t have an account?{" "}
					<Link to="/register">
						<Anchor<"a"> fw={700}>Register</Anchor>
					</Link>
				</Text>
			</Paper>
		</div>
	);
}
