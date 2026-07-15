import * as yup from 'yup'

export const registerScheme = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\d{11}$/, 'Telefone deve conter 11 dígitos (DDD) + número'),
})

export type RegisterFormData = yup.InferType<typeof registerScheme>
