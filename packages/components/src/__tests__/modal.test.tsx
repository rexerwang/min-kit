import { act, fireEvent, render, screen, spyOnConsole } from '@min-kit/jest'
import { View } from '@tarojs/components'
import { createPortal } from 'react-dom'

import * as portals from '../portal/index'

import type { IModal } from '../modal/types'

const ModalStub = (props: IModal.Props) => (
  <View data-testid='test'>
    <View>content</View>
    <View onClick={props.onOk}>ok</View>
    <View onClick={props.onCancel}>cancel</View>
  </View>
)

describe('modal', () => {
  spyOnConsole() // disable console

  const root = document.createElement('page')

  let spy: jest.SpyInstance
  beforeEach(() => {
    spy = jest.spyOn(portals, 'mountPortal').mockImplementation((Component, props): any => {
      const el = document.createElement('root-portal')
      el.classList.add('portal')
      const { unmount } = render(createPortal(<Component {...props} />, el))
      root.appendChild(el)
      document.body.appendChild(root)

      return () => {
        try {
          unmount()
          root.removeChild(el)
          document.body.removeChild(root)
          return true
        } catch {
          return false
        }
      }
    })
  })

  describe('Modal.with', () => {
    it('should render modal toMatchSnapshot', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with('ModalStub', ModalStub)()
      expect(root).toMatchSnapshot()
      modal.unmount()
    })

    it('should close modal with `ok = true` when ok button clicked', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with('ModalStub', ModalStub)()

      act(() => {
        fireEvent.click(screen.getByText(/ok/))
      })

      await expect(modal).resolves.toEqual(expect.objectContaining({ ok: true }))
    })

    it('should close modal with `ok = false` when cancel button clicked', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with('ModalStub', ModalStub)()

      act(() => {
        fireEvent.click(screen.getByText(/cancel/))
      })

      await expect(modal).resolves.toEqual(expect.objectContaining({ ok: false }))
    })

    it('should close modal with `ok = false` when backdrop clicked', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with('ModalStub', ModalStub)({ backdropCloseable: true })

      act(() => {
        fireEvent.click(root.querySelector('.min-drawer')!)
      })

      await expect(modal).resolves.toEqual({ ok: false, detail: 'backdrop' })
    })

    it('should close modal with `ok = false` when unmount', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with('ModalStub', ModalStub)({ backdropCloseable: true })

      act(() => {
        modal.unmount()
      })

      await expect(modal).resolves.toEqual({ ok: false, detail: 'unmount' })
    })

    it('should return false when unmount duplicated', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with('ModalStub', ModalStub)({ backdropCloseable: true })

      act(() => {
        modal.unmount()
      })

      expect(modal.unmount()).toBeFalsy()
    })

    it('should thrown when mountPortal with exception', async () => {
      spy.mockReset().mockImplementation(() => {
        throw new Error('')
      })

      const { Modal } = await import('../modal/index')
      await expect(Modal.with('ModalStub', ModalStub)()).rejects.toThrow()
    })

    it('should render modal with top position', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with(
        'ModalStub',
        ModalStub,
      )({
        position: 'top',
      })

      expect(root.querySelector('.top')).toBeInTheDocument()

      modal.unmount()
    })

    it('should render modal with bottom position', async () => {
      const { Modal } = await import('../modal/index')
      const modal = Modal.with(
        'ModalStub',
        ModalStub,
      )({
        position: 'bottom',
      })

      expect(root.querySelector('.bottom')).toBeInTheDocument()

      modal.unmount()
    })
  })

  describe('Modal.confirm render toMatchSnapshot', () => {
    it('should render Modal.confirm toMatchSnapshot', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        icon: 'icon',
        title: 'Modal.confirm',
        subtitle: 'confirm subtitle',
        okText: 'ok',
        footer: 'confirm footer',
      })

      expect(root).toMatchSnapshot()
      confirm.unmount()
    })

    it('should render Modal.confirm with cancel button', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        icon: 'icon',
        title: 'Modal.confirm',
        subtitle: 'confirm subtitle',
        okText: 'ok',
        cancelText: 'cancel',
        footer: 'confirm footer',
      })

      expect(root).toMatchSnapshot()
      confirm.unmount()
    })

    it('should render Modal.confirm with buttons inline layout', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        icon: 'icon',
        title: 'Modal.confirm',
        subtitle: 'confirm subtitle',
        okText: 'ok',
        cancelText: 'cancel',
        buttonInline: true,
        footer: 'confirm footer',
      })

      expect(root).toMatchSnapshot()
      confirm.unmount()
    })

    it('should render Modal.confirm with custom icon & no-divider', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        icon: <View className='custom-icon'>icon</View>,
        title: 'Modal.confirm',
        okText: 'ok',
        divider: false,
      })

      expect(root).toMatchSnapshot()
      confirm.unmount()
    })
  })

  describe('Modal.confirm with events', () => {
    it('should close confirm with `ok = true` when ok button clicked', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        title: 'Modal.confirm',
        okText: 'ok',
      })

      act(() => {
        fireEvent.click(screen.getByText(/ok/))
      })

      await expect(confirm).resolves.toEqual({ ok: true, detail: undefined })
    })

    it('should close confirm with `ok = true` when ok button clicked with inline layout', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        title: 'Modal.confirm',
        okText: 'ok',
        cancelText: 'cancel',
        buttonInline: true,
      })

      act(() => {
        fireEvent.click(screen.getByText(/ok/))
      })

      await expect(confirm).resolves.toEqual({ ok: true, detail: undefined })
    })

    it('should close confirm with `ok = false` when cancel button clicked', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        title: 'Modal.confirm',
        okText: 'ok',
        cancelText: 'cancel',
      })

      act(() => {
        fireEvent.click(screen.getByText(/cancel/))
      })

      await expect(confirm).resolves.toEqual({ ok: false, detail: 'cancel' })
    })

    it('should close confirm with `ok = false` when ok button clicked with inline layout', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        title: 'Modal.confirm',
        okText: 'ok',
        cancelText: 'cancel',
        buttonInline: true,
      })

      act(() => {
        fireEvent.click(screen.getByText(/cancel/))
      })

      await expect(confirm).resolves.toEqual({ ok: false, detail: 'cancel' })
    })

    it('should close confirm with `ok = false` when close icon clicked', async () => {
      const { Modal } = await import('../modal/index')

      const confirm = Modal.confirm({
        title: 'Modal.confirm',
        okText: 'ok',
        cancelText: 'cancel',
        closeable: true,
      })

      act(() => {
        fireEvent.click(root.querySelector('.close > *')!)
      })

      await expect(confirm).resolves.toEqual({ ok: false, detail: 'close' })
    })
  })
})
