<template>
  <FormKit
    id="my-form"
    type="form"
    submit-label="Get Started"
    @submit.prevent=""
  >
    <FormKit
      type="text"
      label="Name"
      help="This helps us customize your experience."
      validation="required"
    />
    <FormKit
      type="number"
      label="Age"
      validation="required|max:27"
      :validation-messages="{
        required: 'Age is required',
        max: 'no boomers'
      }"
    />

    <FormKit
      type="checkbox"
      name="actions"
      :options="['Forms', 'Are', 'Hard']"
      validation="required|min:2"
      label="Without this..."
      :validation-messages="{
        min: 'Please select at least 2 options'
      }"
    />
  </FormKit>
</template>
