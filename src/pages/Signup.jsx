import { useForm } from "react-hook-form";

import { useAuth } from "../hooks/useAuth";

export function Signup() {

    const { handleSignup } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => handleSignup(data)

    return (
        <>
            <h2 className="text-3xl text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-2/5 mx-auto text-center">
                <label htmlFor="email" className="block mb-1">Email</label>
                <input className="text-black rounded p-1" type="email" {...register("email", {
                    required: true,
                    maxLength: 50
                })} />
                {errors.email?.type === 'required' &&
                    <small className="block mt-1">* This field is required.</small>}
                {errors.email?.type === 'maxLength' &&
                    <small className="block mt-1">* This field is too long.</small>}

                <label htmlFor="username" className="block mb-1 mt-3">Username</label>
                <input className="text-black rounded p-1" {...register("username", {
                    required: true,
                    maxLength: 50
                })} />
                {errors.username?.type === 'required' &&
                    <small className="block mt-1">* This field is required.</small>}
                {errors.username?.type === 'maxLength' &&
                    <small className="block mt-1">* This field is too long.</small>}

                <label htmlFor="password" className="block mb-1 mt-3">Password</label>
                <input className="text-black rounded p-1" type="password" {...register("password", {
                    required: true,
                    maxLength: 255
                })} />
                {errors.password?.type === 'required' &&
                    <small className="block mt-1">* This field is required.</small>}
                {errors.password?.type === 'maxLength' &&
                    <small className="block mt-1">* This field is too long.</small>}

                <input
                    type="submit"
                    className="block mt-4 mx-auto bg-green-700 p-1 px-7 rounded hover:cursor-pointer hover:bg-green-600"
                    value="Send"
                />
            </form>
        </>
    )
}