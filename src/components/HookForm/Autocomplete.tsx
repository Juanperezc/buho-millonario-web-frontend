import { AutocompleteInterface } from '@interfaces/components/autocomplete.interface'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { Fragment } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegisterReturn
} from 'react-hook-form'

interface ComponentInterface {
  control: Control<any>
  register: UseFormRegisterReturn<any>
  errors: FieldErrors<any>
  name: string
  label: string
  loading: boolean
  options: AutocompleteInterface[]
  disabled?: boolean
}

export default function AutocompleteHookForm (props: ComponentInterface) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          disabled={props.disabled}
          noOptionsText={'Sin resultados'}
          disableClearable
          loading={props.loading}
          value={value || null}
          onChange={(_event, item) => {
            onChange(item)
          }}
          loadingText="Cargando..."
          disablePortal
          getOptionLabel={(option) => option.label}
          options={props.options}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!props.errors[props.name]}
              helperText={props.errors[props.name]?.message as string}
              label={props.label}
              InputProps={{
                ...params.InputProps,
                autoComplete: 'off',
                endAdornment: (
                  <Fragment>
                    {props.loading && (
                      <CircularProgress color="inherit" size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </Fragment>
                )
              }}
            />
          )}
        />
      )}
    />
  )
}
