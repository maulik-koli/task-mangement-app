'use client'
import React from "react"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { defaultSignupValue, SignupFormType, signupSchema } from "@/schemas/auth-schema"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"


const SignupForm: React.FC = () => {
  const form = useForm<SignupFormType>({
    defaultValues: defaultSignupValue,
    resolver: zodResolver(signupSchema)
  })
  const { control, handleSubmit } = form
  
  const submit = (data: SignupFormType) => {
    console.log(data)
  }
  

  return (
    <form onSubmit={handleSubmit(submit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              label="Name"
              value={field.value || ''}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              label="Email"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              id="password"
              type="password"
              placeholder="*****"
              label="Password"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              id="confirmPassword"
              type="password"
              placeholder="*****"
              label="Confirm Password"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <FieldGroup>
          <Field>
            <Button type="submit">Create Account</Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link href="/login"> in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  )
}

export default SignupForm