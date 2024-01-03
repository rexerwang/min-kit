import { act, screen, spyOnConsole } from '@min-kit/jest'
import { useEffect } from 'react'

describe('mountPortal', () => {
  spyOnConsole() // disable console

  it('should mount & unmount portal both in React & DOM', async () => {
    const page = document.createElement('page')
    document.body.appendChild(page)

    jest.doMock('@min-kit/extends', () => ({
      ...jest.requireActual('@min-kit/extends'),
      getRootElement: () => page,
    }))

    const onUnmountStub = jest.fn()
    const CompStub = () => {
      useEffect(() => {
        return () => {
          onUnmountStub()
        }
      }, [])

      return <div data-testid='test'></div>
    }

    const { mountPortal } = await import('../portal')
    const unmount = mountPortal(CompStub)

    expect(screen.getByTestId('test')).toBeInTheDocument()

    act(() => {
      expect(unmount()).toBeTruthy()
    })

    expect(screen.queryByTestId('test')).toBeNull()
    expect(onUnmountStub).toHaveBeenCalled()

    act(() => {
      expect(unmount()).toBeFalsy()
    })

    document.body.removeChild(page)
    jest.dontMock('@min-kit/extends')
  })

  it('should throw error when mountPortal without page instance', async () => {
    await jest.isolateModulesAsync(async () => {
      const { mountPortal } = await import('../portal')
      expect(() => mountPortal(() => null)).toThrow('Not found page instance')
    })
  })
})
