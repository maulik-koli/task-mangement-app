import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import SignupForm from './signup-form'

const SignupCard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
        </Card>
    )
}

export default SignupCard