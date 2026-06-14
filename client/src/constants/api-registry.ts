
export const MUTATION_REGISTRY = {
    login: "login",
    signup: "signup",
    logout: "logout",

    createTask: "create-task",
    updateTask: "update-task",
    deleteTask: "delete-task"
} as const;


export const QUERY_REGISTRY = {
    profile: "profile",

    getTaskList: "get-task-list",
    getTask: "get-task"
} as const;