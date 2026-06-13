import { useMutation } from "@tanstack/react-query";
import { login, logout, signup } from "./api";

import { MutationOptions } from "@/types/api";
import { LoginFormType, SignupFormType } from "@/schemas/auth-schema";
import { MUTATION_REGISTRY } from "@/constants/api-registry";


export const useLogin = (
    options?: MutationOptions<null, LoginFormType>
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.login],
        mutationFn: (payload) => login(payload),
        ...options,
    });
};

export const useSignup = (
    options?: MutationOptions<null, SignupFormType>
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.signup],
        mutationFn: (payload) => signup(payload),
        ...options,
    });
};

export const useLogout = (
    options?: MutationOptions<null, undefined>
) => {
    
    return useMutation({
        mutationKey: [MUTATION_REGISTRY.login],
        mutationFn: () => logout(),
        ...options,
    });
};