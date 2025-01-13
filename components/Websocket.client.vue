<script setup lang="ts">
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
const { status, data, send, open, close } = useWebSocket(`${wsProtocol}//${location.host}/_ws`)

// An array to store all chat messages and display them:
const history = ref<string[]>([])
// listen to messages from other clients:
watch(data, (newValue) => {
  history.value.push(newValue)
})

const message = ref('')
function sendData() {
  // message sent by current client:
  history.value.push(message.value)
  send(message.value)
  message.value = ''
}
</script>

<template>
  <form @submit.prevent="sendData">
    <input type="text" v-model="message" />
    <button type="submit">Send</button>
  </form>
  <p v-for="entry in history">{{ entry }}</p>
</template>
