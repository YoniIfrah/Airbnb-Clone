"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: { name: "", email: "", password: "" },
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((e) => {
                // console.log(e);
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onToggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    }, [loginModal, registerModal]);
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
                center={true}
            />
            <Input
                id="email"
                label="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {
                    signIn("google");
                }}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {
                    signIn("github");
                }}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>Already have an account?</div>
                    <div
                        className=" text-neutral-800 cursor-pointer hover:underline"
                        onClick={onToggle}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
