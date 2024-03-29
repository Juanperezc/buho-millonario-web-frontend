import Swal from 'sweetalert2'

export const swalLoading = (title: string = 'Cargando...') => {
  void Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

export const swalClose = () => {
  Swal.close()
}

export const swalError = (
  title: string = 'Ha ocurrido un error',
  text?: string
) => {
  void Swal.fire({
    icon: 'error',
    title,
    text: text ?? ''
  })
}

export const swalQuestion = async (
  title: string = '¿Está seguro?',
  text?: string
) => {
  return await Swal.fire({
    icon: 'question',
    title,
    text: text ?? '',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  })
}

export const swalSuccess = (title: string = 'Éxito', text?: string) => {
  void Swal.fire({
    icon: 'success',
    title,
    text: text ?? '',
    confirmButtonText: 'Aceptar'
  })
}
