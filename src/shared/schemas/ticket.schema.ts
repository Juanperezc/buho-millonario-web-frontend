import { TICKET_CODE_REQUIRED_YUP, TICKET_IS_RANDOM_REQUIRED_YUP, TICKET_LITTLE_ANIMAL_REQUIRED_YUP } from '@constants/yup.constants'
import * as yup from 'yup'

export const ticketSchema = yup
  .object({
    isRandom: yup.boolean().required(TICKET_IS_RANDOM_REQUIRED_YUP),
    code: yup.number().when('isRandom', {
      is: true,
      then: yup.number().typeError('El valor debe ser numérico').required(TICKET_CODE_REQUIRED_YUP).test('len', 'El valor debe ser exactamente 5 dígitos', val => val?.toString().length === 5)
    }),
    littleAnimalId: yup.mixed().when('isRandom', {
      is: true,
      then: yup.mixed().required(TICKET_LITTLE_ANIMAL_REQUIRED_YUP)
    })
  })
  .required()
