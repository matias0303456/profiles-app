import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { AuthContext } from "../context/AuthProvider";
import { useUsers } from "../hooks/useUsers";

export function UpdateUser() {

    const { auth } = useContext(AuthContext)

    const params = useParams()

    const { updateUser } = useUsers()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const avatarRef = useRef(null)

    const onSubmit = ({ avatar, username, bio }) => updateUser({ avatar, username, bio })

    if (parseInt(params.id) !== parseInt(auth.user.id)) return <h2 className="text-3xl text-center mb-6">
        403 - Forbidden
    </h2>

    return (
        <>
            <h2 className="text-3xl text-center mb-6">Edit my data</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-2/5 mx-auto text-center">
                <label htmlFor="username" className="block mb-1 mt-3">Username</label>
                <input defaultValue={auth.user.username} className="text-black rounded p-1 w-full" {...register("username", {
                    required: true,
                    maxLength: 50
                })} />
                {errors.username?.type === 'required' &&
                    <small className="block mt-1">* This field is required.</small>}
                {errors.username?.type === 'maxLength' &&
                    <small className="block mt-1">* This field is too long.</small>}

                <label htmlFor="username" className="block mb-1 mt-3">Biography</label>
                <textarea
                    cols="30"
                    rows="10"
                    className="text-black rounded p-1 resize-none w-full"
                    defaultValue={auth.user.profile.bio}
                    {...register("bio", {
                        maxLength: 255
                    })}></textarea>
                {errors.bio?.type === 'maxLength' &&
                    <small className="block mt-1">* This field is too long.</small>}

                <label htmlFor="avatar" className="block mb-1 mt-3">New avatar</label>
                <input type="file" className="rounded p-1 w-full" {...register("avatar")} />

                <input
                    type="submit"
                    className="block mt-4 mx-auto bg-green-700 p-1 px-7 rounded hover:cursor-pointer hover:bg-green-600"
                    value="Send"
                />
            </form>
        </>
    )
}