jest.doMock('@min-kit/extends', () => ({
  ...jest.requireActual('@min-kit/extends'),
  getRootElement: () => {
    const page = document.createElement('page')
    document.body.appendChild(page)
    return page
  },
}))

const ViewStub = (props: any) => <div test-id='test' className='test' {...props}></div>

describe('portal specs', () => {
  it('should mountPortal correctly', async () => {
    const { mountPortal } = await import('../portal/index.tsx')
    mountPortal(ViewStub)
    expect(document.body.querySelector('.test')).toBeInTheDocument()
  })

  it.todo('should unmount correctly')
})
