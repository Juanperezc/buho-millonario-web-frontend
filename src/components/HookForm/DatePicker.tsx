import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Control, Controller, FieldErrors } from "react-hook-form";
interface ComponentInterface {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  label: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export default function DatePicker({
  control,
  name,
  errors,
  label,
  disabled,
  maxDate,
  minDate
}: ComponentInterface): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DesktopDatePicker
        
          maxDate={maxDate}
          minDate={minDate}
          disabled={disabled}
          className="w-full"
          label={label}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={onChange}
          renderInput={(params: JSX.IntrinsicAttributes) => (
            <TextField
              {...params}
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
            />
          )}
        />
      )}
    />
  );
}
