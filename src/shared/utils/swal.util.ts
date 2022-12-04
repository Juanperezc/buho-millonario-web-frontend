import Swal from "sweetalert2";

export const swalLoading = (title: string = "Cargando...") => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(null);
    },
  });
};

export const swalClose = () => {
  Swal.close();
};

export const swalError = (
  title: string = "Ha ocurrido un error",
  text?: string
) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text ?? "",
  });
};

export const swalSuccess = (title: string = "Éxito", text?: string) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text ?? "",
    confirmButtonText: "Aceptar",
  });
};
