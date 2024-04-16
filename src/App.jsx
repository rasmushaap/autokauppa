import { AppBar, Toolbar, Typography } from '@mui/material'
import './App.css'
import CarList from './components/CarList'

function App() {

  return (
    <>
      <AppBar position={'static'}>
        <Toolbar>
          <Typography variant='h6'>
            Autokauppa
          </Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </>
  )
}

export default App