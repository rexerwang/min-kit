import { act, screen } from '@min-kit/jest'
import { useEffect } from 'react'

const CompStub = ({ onUnmount }: { onUnmount(): void }) => {
  useEffect(() => {
    return () => {
      onUnmount()
    }
  }, [onUnmount])

  return <div data-testid='test'></div>
}

describe('unmount portal', () => {
  const page = document.createElement('page')

  jest.doMock('@min-kit/extends', () => ({
    ...jest.requireActual('@min-kit/extends'),
    getRootElement: () => page,
  }))

  it('should mount & unmount portal both in React & DOM', async () => {
    document.body.appendChild(page)

    const { mountPortal } = await import('../../portal/index.tsx')

    const onUnmountStub = jest.fn()
    const unmount = mountPortal(CompStub, { onUnmount: onUnmountStub })

    expect(screen.getByTestId('test')).toBeInTheDocument()

    act(() => {
      expect(unmount()).toBeTruthy()
    })

    expect(screen.queryByTestId('test')).toBeNull()
    expect(onUnmountStub).toHaveBeenCalled()

    act(() => {
      expect(unmount()).toBeFalsy()
    })
  })
})
