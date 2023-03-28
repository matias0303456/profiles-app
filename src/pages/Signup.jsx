import { useForm } from "react-hook-form";

import { useAuth } from "../hooks/useAuth";

export function Signup() {

    const { handleSignup } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => handleSignup(data)

    return (
        <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input className="text-black" type="email" {...register("email", {
                    required: true,
                    maxLength: 50
                })} />
                {errors.email?.type === 'required' && <small>* This field is required.</small>}
                {errors.email?.type === 'maxLength' && <small>* This field is too long.</small>}

                <label htmlFor="username">Username</label>
                <input className="text-black" type="text" {...register("username", {
                    required: true,
                    maxLength: 50
                })} />
                {errors.username?.type === 'required' && <small>* This field is required.</small>}
                {errors.username?.type === 'maxLength' && <small>* This field is too long.</small>}

                <label htmlFor="password">Password</label>
                <input className="text-black" type="password" {...register("password", {
                    required: true,
                    maxLength: 255
                })} />
                {errors.password?.type === 'required' && <small>* This field is required.</small>}
                {errors.password?.type === 'maxLength' && <small>* This field is too long.</small>}

                <input type="submit" value="Send" />
            </form>
        </>
    )
}