'use client'
import React from "react"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { defaultLoginValue, LoginFormType, loginSchema } from "@/schemas/auth-schema"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"


const LoginForm: React.FC = () => {
  const form = useForm<LoginFormType>({
    defaultValues: defaultLoginValue,
    resolver: zodResolver(loginSchema)
  })
  const { control, handleSubmit } = form

  const submit = (data: LoginFormType) => {
    console.log(data)
  }


  return (
    <form onSubmit={handleSubmit(submit)}>
      <FieldGroup>
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
        <Field>
          <Button type="submit">Login</Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm