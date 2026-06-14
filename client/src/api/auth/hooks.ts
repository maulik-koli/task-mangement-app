import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout, profile, signup } from "./api";

import { MutationOptions, QueryOptions } from "@/types/api";
import { LoginFormType, SignupFormType } from "@/schemas/auth-schema";
import { MUTATION_REGISTRY, QUERY_REGISTRY } from "@/constants/api-registry";
import { User } from "./type";


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
        mutationKey: [MUTATION_REGISTRY.logout],
        mutationFn: () => logout(),
        ...options,
    });
};

export const useGetProfile = (
    options?: QueryOptions<User>
) => {
    return useQuery({
        queryKey: [QUERY_REGISTRY.profile],
        queryFn: () => profile(),
        retry: false,
        ...options,
    });
};
