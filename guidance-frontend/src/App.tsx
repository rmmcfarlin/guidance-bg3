import './App.css'
import { AppWrapper } from './components/app-wrapper'
import { ThemeProvider } from './context-providers/theme-provider'

function App() {


  return (
    <>
      <ThemeProvider>
          <AppWrapper />
      </ThemeProvider>
    </>
  )
}

export default App
