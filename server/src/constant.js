
export const DB_NANE="authentication-system"

export const userRolesEnum={
    SUPER_ADMIN:"SUPER_ADMIN",
    ADMIN:"ADMIN",
    MANAGER:"MANAGER",
    USER:"USER"
}

export const AvailableUserROles=Object.values(userRolesEnum)

export const userLoginType={
    GOOGLE:"GOOGLE",
    GITHUB:"GITHUB",
    EMAIL_PASSWORD:"EMAIL_PASSWORD"
}

export const AvailableUserLoginTypes=Object.values(userLoginType)