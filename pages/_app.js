import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux'

import { darkTheme } from '../themes'
import { store } from '../store/index'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
          <NextUIProvider theme={ darkTheme }>
              <Component {...pageProps} />
          </NextUIProvider>
      </Provider>
  )
}

export default MyApp