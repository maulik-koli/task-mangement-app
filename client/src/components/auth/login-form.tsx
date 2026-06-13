'use client'
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { defaultLoginValue, LoginFormType, loginSchema } from "@/schemas/auth-schema"
import { useLogin } from "@/api/auth/hooks"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Log } from "@/lib/utils"


const LoginForm: React.FC = () => {
  const form = useForm<LoginFormType>({
    defaultValues: defaultLoginValue,
    resolver: zodResolver(loginSchema)
  })
  const { control, handleSubmit } = form

  const { mutate, isPending } = useLogin()
  const router = useRouter()
  const toast = useToast()

  const submit = (data: LoginFormType) => {
    mutate(data, {
      onSuccess(data) {
        Log('okay', 1)
        toast.success(data.message)
        router.push("/")
      },
    })
  }

  toast.isLoading(isPending, "Loading...")


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