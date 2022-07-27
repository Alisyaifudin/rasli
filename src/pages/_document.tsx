import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scroll-smooth'>
      <Head />
      <body>
        <Main />
        <div id='myportal' />
        <NextScript />
      </body>
    </Html>
  )
}