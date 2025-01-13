import type { Peer, Message, WSError } from 'crossws'
const chat = 'chat'

export default defineWebSocketHandler({
  open(peer: Peer) {
    console.log('opened WS', peer)
    peer.subscribe(chat)
    peer.publish(chat, 'Another user joined the chat')
  },
  close(peer: Peer) {
    console.log('closed WS', peer)
    peer.publish('chat', `${peer} left!`)
  },
  error(peer: Peer, error: WSError) {
    console.log('error on WS', peer, error)
  },
  message(peer: Peer, message: Message) {
    console.log('message on WS', peer, message)
    peer.publish(chat, message.text())
  }
})
