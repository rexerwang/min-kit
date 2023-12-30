import { MinDebugger, MinDebuggerOptions, MinText } from '@min-kit/components'
import { Button, View } from '@tarojs/components'

export const options: MinDebuggerOptions = {
  className: 'your-className',
  StatusHeader() {
    const profile = { name: 'MinDebugger' }
    return (
      <View className='section'>
        <MinText className='title'>Profile</MinText>
        <MinText className='content'>{JSON.stringify(profile, null, 2)}</MinText>
      </View>
    )
  },
  StatusButton() {
    return <Button plain>Login</Button>
  },
}

function App({ children }) {
  MinDebugger.use(options)

  return children
}

export default App

export const BasicUsageSnippet = `// src/app.ts

import { MinDebugger } from '@min-kit/components'

function App({ children }) {
  MinDebugger.use()

  return children
}

export default App
`

export const OptionsUsageSnippet = `// src/app.ts
import { MinDebugger, MinDebuggerOptions, MinText } from '@min-kit/components'
import { Button, View } from '@tarojs/components'

const options: MinDebuggerOptions = {
  className: 'your-className',
  StatusHeader() {
    const data = { name: 'MinDebugger' }
    return (
      <View className='section'>
        <MinText className='title'>自定义Header</MinText>
        <MinText className='content'>{JSON.stringify(data, null, 2)}</MinText>
      </View>
    )
  },
  StatusFooter() {
    const data = { name: 'MinDebugger' }
    return (
      <View className='section'>
        <MinText className='title'>自定义Footer</MinText>
        <MinText className='content'>{JSON.stringify(data, null, 2)}</MinText>
      </View>
    )
  },
  StatusButton() {
    return <Button plain>Login</Button>
  },
}

function App({ children }) {
  MinDebugger.use(options)

  return children
}

export default App
`
