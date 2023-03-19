export interface BaseProps {
  testId: string
  example: string
  options?: { [key: string]: any }
}

export type Message = 'hello' | 'goodbye'
