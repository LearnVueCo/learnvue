<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod'
import { z } from 'zod'

const zodSchema = z.object({
  name: z.string(),
  age: z
    .number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number'
    })
    .min(0, {
      message: 'Age must be greater than 0'
    })
    .max(26, {
      message: 'no boomers'
    }),
  actions: z.string().array().min(2)
})

const [zodPlugin, submitHandler] = createZodPlugin(
  zodSchema,
  async (formData: z.infer<typeof zodSchema>) => {
    // now we have validated our data with our type
    // our server should also validate the data too though
    console.log(formData)
  }
)
</script>

<template>
  <FormKit
    type="form"
    :plugins="[zodPlugin]"
    @submit="submitHandler"
    submit-label="Get Started"
  >
    <FormKit
      type="text"
      label="Name"
      name="name"
      help="This helps us customize your experience."
    />
    <FormKit
      type="text"
      name="age"
      label="Age"
      help="Enter a number between 0 and 50."
    />
    <FormKit
      type="checkbox"
      name="actions"
      label="I have..."
      :options="['Liked', 'Commented', 'Subscribed']"
    />
  </FormKit>
</template>
