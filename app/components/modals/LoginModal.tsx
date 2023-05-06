"use client";
import React, {useCallback, useState} from 'react'
import {signIn} from 'next-auth/react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import useLoginModal from '@/app/hooks/userLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';



const LoginModal = () => {
    const router = useRouter()
    const LoginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors} } = useForm<FieldValues>({defaultValues:{email:'', password:''}})
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        /** data will be the obj from FieldValues */
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

            if(callback?.ok){
                toast.success('Logged in')
                router.refresh()
                LoginModal.onClose()
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
        }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome Back' subtitle='Login to your account!' center={true}/>
            <Input id='email' label='email' disabled={isLoading} register={register} errors={errors} required/>

            <Input id='password' label='password' type='password' disabled={isLoading} register={register} errors={errors} required/>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => {signIn('google')}}/>
            <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => {signIn('github')}}/>
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div className=' text-neutral-800 cursor-pointer hover:underline' onClick={LoginModal.onClose}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
    disabled={isLoading} 
    isOpen={LoginModal.isOpen} 
    title='Login' 
    actionLabel='Continue' 
    onClose={LoginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal