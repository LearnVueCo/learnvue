import { test, describe, expect, vi } from 'vitest'
import {
  mockNuxtImport,
  mountSuspended,
  mockComponent
} from 'vitest-environment-nuxt/utils'
import App from '~/app.vue'

// we can mock any autoimported composable

// typeof will give us type-hints for our mock
mockNuxtImport<typeof useLogin>('useLogin', () => {
  return () => {
    const email = ref('matt@learnvue.co')
    const password = ref('password')

    const login = vi.fn()

    return {
      email,
      password,
      login
    }
  }
})

// we can mock components too
// mockComponent('Foo', () => import('./mocks/MockFoo.vue'))
mockComponent('Foo', () => {
  return {
    template: '<div>Mocked Foo</div>'
  }
})

describe('it should work', () => {
  test('can access built in nuxt composables', () => {
    const config = useRuntimeConfig()
    expect(config).toBeDefined()
  })

  test('can use our auto imports!', () => {
    const { count } = useCount()
    expect(count.value).toEqual(0)
  })

  test('can mock autoimports', () => {
    const { email, password, login } = useLogin()

    expect(email.value).toEqual('matt@learnvue.co')
  })

  test('can mount in a nuxt environment', async () => {
    const wrapper = await mountSuspended(App)
    expect(wrapper.html()).toContain('This is my app.')
  })

  test('can mock components', async () => {
    const wrapper = await mountSuspended(App)
    expect(wrapper.html()).toContain('Mocked Foo')
  })
})
