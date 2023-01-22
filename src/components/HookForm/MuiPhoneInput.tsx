import { MuiTelInput } from 'mui-tel-input'
import { Control, Controller, FieldErrors } from 'react-hook-form'

interface ComponentInterface {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  disabled?: boolean
  label: string
}

export default function MuiPhoneInput ({
  control,
  errors,
  name,
  label,
  disabled
}: ComponentInterface) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <MuiTelInput
          label={label}
            disabled={disabled}
          value={value || null}
          onChange={(_event, item) => {
            onChange(item.numberValue)
          }}
          forceCallingCode
          preferredCountries={['VE']}
          defaultCountry="VE"
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  )
}
