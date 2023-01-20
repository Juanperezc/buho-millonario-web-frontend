import * as yup from "yup";
import {
    BIRTH_DATE_REQUIRED_YUP,
    DNI_REQUIRED_YUP,
    EMAIL_REQUIRED_YUP,
    FIRST_NAME_REQUIRED_YUP,
    LAST_NAME_REQUIRED_YUP,
    MUNICIPALITY_REQUIRED_YUP,
    PARISH_REQUIRED_YUP,
    STATE_REQUIRED_YUP,
  } from "@constants/yup.constants";

export const userSchema = yup
  .object({
    firstName: yup.string().required(FIRST_NAME_REQUIRED_YUP),
    lastName: yup.string().required(LAST_NAME_REQUIRED_YUP),
    email: yup.string().required(EMAIL_REQUIRED_YUP),
    state: yup.mixed().required(STATE_REQUIRED_YUP),
    municipality: yup.mixed().required(MUNICIPALITY_REQUIRED_YUP),
    parish: yup.mixed().required(PARISH_REQUIRED_YUP),
    birthDate: yup.date().required(BIRTH_DATE_REQUIRED_YUP).nullable(),
    dni: yup.string().required(DNI_REQUIRED_YUP),
    phone: yup.string().nullable(),
    address: yup.string().nullable()
  })
  .required();