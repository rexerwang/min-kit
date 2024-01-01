import { act, createEvent, fireEvent, render, screen } from '@min-kit/jest'
import { View } from '@tarojs/components'

import { Gesture } from '../gesture'

describe('<Gesture />', () => {
  it('should render <Gesture /> toMatchSnapshot', () => {
    expect(
      render(
        <Gesture>
          <View>GestureTarget</View>
        </Gesture>,
      ).asFragment(),
    ).toMatchSnapshot()
  })

  it('should determine swipe down', () => {
    const onSwipeStub = jest.fn()

    render(
      <Gesture onSwipe={onSwipeStub}>
        <View>GestureTarget</View>
      </Gesture>,
    )

    const el = screen.getByText(/GestureTarget/)

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchStart(el), { touches: [{ pageX: 0, pageY: 0 }] }))
    })

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchEnd(el), { touches: [{ pageX: 0, pageY: 10 }] }))
    })

    expect(onSwipeStub).toHaveBeenCalledWith({ horizontal: false, direction: 'down', distance: 10 })
  })

  it('should determine swipe up', () => {
    const onSwipeStub = jest.fn()

    render(
      <Gesture onSwipe={onSwipeStub}>
        <View>GestureTarget</View>
      </Gesture>,
    )

    const el = screen.getByText(/GestureTarget/)

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchStart(el), { touches: [{ pageX: 0, pageY: 10 }] }))
    })

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchEnd(el), { touches: [{ pageX: 0, pageY: 0 }] }))
    })

    expect(onSwipeStub).toHaveBeenCalledWith({ horizontal: false, direction: 'up', distance: 10 })
  })

  it('should determine swipe left', () => {
    const onSwipeStub = jest.fn()

    render(
      <Gesture onSwipe={onSwipeStub}>
        <View>GestureTarget</View>
      </Gesture>,
    )

    const el = screen.getByText(/GestureTarget/)

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchStart(el), { touches: [{ pageX: 10, pageY: 0 }] }))
    })

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchEnd(el), { touches: [{ pageX: 0, pageY: 0 }] }))
    })

    expect(onSwipeStub).toHaveBeenCalledWith({ horizontal: true, direction: 'left', distance: 10 })
  })

  it('should determine swipe right', () => {
    const onSwipeStub = jest.fn()

    render(
      <Gesture onSwipe={onSwipeStub}>
        <View>GestureTarget</View>
      </Gesture>,
    )

    const el = screen.getByText(/GestureTarget/)

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchStart(el), { changedTouches: [{ pageX: 0, pageY: 0 }] }))
    })

    act(() => {
      fireEvent(el, Object.assign(createEvent.touchEnd(el), { changedTouches: [{ pageX: 10, pageY: 0 }] }))
    })

    expect(onSwipeStub).toHaveBeenCalledWith({ horizontal: true, direction: 'right', distance: 10 })
  })
})
