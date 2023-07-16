<script setup lang="ts">
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import {
  query,
  collection,
  deleteDoc,
  doc,
  setDoc,
  where
} from 'firebase/firestore'

const user = useCurrentUser()

const db = useFirestore()
const id = useState('number', () => 0)

const cursors = useCollection(
  query(collection(db, 'cursors'), where('userId', '!=', id.value + 1))
)

const { x, y } = useMouse()
// convert mouse position to percent of screen
const mousePosition = computed(() => ({
  x: (x.value / window.innerWidth) * 100,
  y: (y.value / window.innerHeight) * 100
}))

watchDebounced(
  mousePosition,
  () => {
    if (!user) return
    setDoc(doc(collection(db, 'cursors'), id.value.toString()), {
      userId: id.value,
      ...mousePosition.value
    })
  },
  { debounce: 5, maxWait: 200 }
)

if (process.client) {
  window.onbeforeunload = async function () {
    await deleteDoc(doc(collection(db, 'cursors'), id.value.toString()))
    return
  }
}
</script>

<template>
  <div>
    <div v-if="!user">
      <button
        @click="() => signInWithPopup(getAuth(), new GoogleAuthProvider())"
      >
        Join
      </button>
    </div>
    <template v-else>
      <button @click="() => signOut(getAuth())">Logout</button>
      <div
        v-for="i in cursors"
        :key="i.id"
        class="w-4 h-4 bg-red-500 rounded-full pointer-events-none"
        :style="{
          position: 'absolute',
          left: `calc(${i.x}% - 8px)`,
          top: `calc(${i.y}% - 8px)`
        }"
      ></div>
    </template>
  </div>
</template>
