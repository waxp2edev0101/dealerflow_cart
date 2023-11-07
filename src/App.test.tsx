// import { render } from '@testing-library/react'

// import App from './App'
// import { isEmpty } from "lodash"
import { isEmpty } from './utils/common'

test('Show App Component', () => {
  // render(<App />)
  console.log('test')

  // expect(screen.getByText("I'm REACT_APP_TEXT from .env")).toBeInTheDocument()
})

describe('Test utilities', () => {
  test('check empty', () => {
    let value: any = [0, 0, 0]
    console.log(`[0, 0, 0] is empty `, isEmpty(value))
    value = []
    console.log(`[] is empty `, isEmpty(value))
    value = ''
    console.log(`'' is empty `, isEmpty(value))
    console.log(`['a'] is empty `, isEmpty(['a']))
    console.log(`[0,1] is empty `, isEmpty([0, 1]))
  })
})
