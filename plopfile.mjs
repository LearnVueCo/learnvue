const NUXT_FILES = [
  'public/favicon.ico',
  '.gitignore',
  '.npmrc',
  'app.vue',
  'nuxt.config.ts',
  'package.json',
  'pnpm-lock.yaml',
  'README.md',
  'tsconfig.json'
]

const VITE_FILES = [
  'public/vite.svg',
  'src/assets/vue.svg',
  'src/components/HelloWorld.vue',
  'src/App.vue',
  'src/main.ts',
  'src/style.css',
  'src/vite-env.d.ts',
  '.gitignore',
  'index.html',
  'package.json',
  'pnpm-lock.yaml',
  'postcss.config.js',
  'README.md',
  'tailwind.config.js',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.ts'
]

export default function (plop) {
  const transformName = (str) => {
    return str.toLowerCase().replace(/ /g, '-')
  }
  plop.setGenerator('example', {
    description: 'create a new example',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Example name: '
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template to copy: ',
        choices: [
          { name: 'Nuxt', value: 'nuxt' },
          { name: 'Vue + Vite', value: 'vue-vite' }
        ]
      },
      {
        type: 'list',
        name: 'exampleScopeFolder',
        message: 'Scope (Example folder): ',
        choices: [
          { name: 'Nuxt', value: 'nuxt-3' },
          { name: 'UI', value: 'ui' }
        ]
      }
    ],
    actions: (data) => {
      const plopExampleName = transformName(data.name)
      const plopPath = `demos/${data.exampleScopeFolder}/${plopExampleName}`

      const filesToCopy = data.template === 'nuxt' ? NUXT_FILES : VITE_FILES

      const actions = []

      filesToCopy.forEach((file) => {
        actions.push({
          type: 'add',
          path: `${plopPath}/${file}`,
          templateFile: `internal/_templates/${data.template}/${file}`
        })
      })

      // modify README.md
      actions.push({
        type: 'modify',
        path: `${plopPath}/README.md`,
        pattern: /(-- EXAMPLE NAME --)/gi,
        template: `${data.name}`
      })

      actions.push({
        type: 'modify',
        path: `${plopPath}/README.md`,
        pattern: /(-- EXAMPLE PATH --)/gi,
        template: `${plopPath}`
      })

      return [...actions]
    }
  })
}
