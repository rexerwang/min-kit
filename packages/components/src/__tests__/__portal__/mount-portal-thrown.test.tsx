import { mountPortal } from '../../portal'

it('should thrown on mountPortal without page instance', async () => {
  expect(() => mountPortal(() => <div>test</div>)).toThrow(/Not found page instance/)
})
