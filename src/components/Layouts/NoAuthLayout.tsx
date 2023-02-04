import { Grid } from '@mui/material'
import { swalClose, swalLoading } from '@utils/swal.util'
import { Navigate } from 'react-router-dom'
import './no-auth-layout.css'
interface NoAuthLayoutProps {
  children: JSX.Element
  userToken: string | null
}
const NoAuthLayout = ({ children, userToken }: NoAuthLayoutProps) => {
  if (userToken) {
    swalLoading('Redireccionando...')
    setTimeout(() => {
      swalClose()
    }, 1000)
    return <Navigate to={'/dashboard/home'} replace />
  }
  return (
    <>
      <div className="context">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>

            <div className="my-5">
              <img className="w-25 h-20 mx-auto" src="/buho_logo_blanco.png" />
            </div>
            <div style={{ zIndex: 10000 }}>
              {children}
            </div>

          </Grid>
        </Grid>
      </div>
      <div className="area" >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
    </>
  )
}

export default NoAuthLayout
