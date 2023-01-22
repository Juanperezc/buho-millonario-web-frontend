import {
  DESCRIPTION_REQUIRED_YUP,
  FINISH_DATE_MIN_STARTED,
  FINISH_DATE_REQUIRED_YUP,
  MAX_REWARD_YUP,
  MIN_PRICE_YUP,
  MIN_REWARD_YUP,
  POSITIVE_REWARD_YUP,
  REWARD_1_DIGIT_REQUIRED_YUP,
  REWARD_2_DIGIT_REQUIRED_YUP,
  REWARD_3_DIGIT_REQUIRED_YUP,
  REWARD_4_DIGIT_REQUIRED_YUP,
  REWARD_5_DIGIT_REQUIRED_YUP,
  START_DATE_REQUIRED_YUP,
  TICKET_PRICE_REQUIRED_YUP,
  TITLE_REQUIRED_YUP
} from '@constants/yup.constants'
import * as yup from 'yup'

const lotterySchema = yup
  .object({
    title: yup.string().required(TITLE_REQUIRED_YUP),
    description: yup.string().required(DESCRIPTION_REQUIRED_YUP),
    ticketPrice: yup
      .number()
      .min(1, MIN_PRICE_YUP)
      .required(TICKET_PRICE_REQUIRED_YUP),
    reward1Digits: yup
      .number()
      .required(REWARD_1_DIGIT_REQUIRED_YUP)
      .min(0, MIN_REWARD_YUP)
      .max(100, MAX_REWARD_YUP)
      .positive(POSITIVE_REWARD_YUP),
    reward2Digits: yup
      .number()
      .required(REWARD_2_DIGIT_REQUIRED_YUP)
      .min(0, MIN_REWARD_YUP)
      .max(100, MAX_REWARD_YUP)
      .positive(POSITIVE_REWARD_YUP),
    reward3Digits: yup
      .number()
      .required(REWARD_3_DIGIT_REQUIRED_YUP)
      .min(0, MIN_REWARD_YUP)
      .max(100, MAX_REWARD_YUP)
      .positive(POSITIVE_REWARD_YUP),
    reward4Digits: yup
      .number()
      .required(REWARD_4_DIGIT_REQUIRED_YUP)
      .min(0, MIN_REWARD_YUP)
      .max(100, MAX_REWARD_YUP)
      .positive(POSITIVE_REWARD_YUP),
    reward5Digits: yup
      .number()
      .required(REWARD_5_DIGIT_REQUIRED_YUP)
      .min(0, MIN_REWARD_YUP)
      .max(100, MAX_REWARD_YUP)
      .positive(POSITIVE_REWARD_YUP),
    startDate: yup.date().required(START_DATE_REQUIRED_YUP),
    finishDate: yup
      .date()
      .required(FINISH_DATE_REQUIRED_YUP)
      .when(
        'startDate',
        (startDate, yup) =>
          (Boolean(startDate)) && yup.min(startDate, FINISH_DATE_MIN_STARTED)
      )
  })
  .required()

export default lotterySchema
