import { test, expect } from 'vitest'

const add = (a: number, b: number) => a + b

test('add function', () => {
    expect(add(1, 1)).toEqual(2)
})