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

export const swalError = (title: string, text: string) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};
