<template>

        <q-page class="q-pa-md">
            <div class="row">
               <div class="col">
                <q-input
                  v-model="message"
                  type="textarea"
                  float-label="Textarea"
                  :max-height="50"
                  rows="1"
                />
              </div>
              <div class="col-auto self-center">
                <q-btn color="primary" @click="sendMessage()"
                  icon="mail" icon-right="send" label="Отправить" />
              </div>
            </div>

            <div style="width: 500px; max-width: 90vw;">


          <q-chat-message
            v-for="(msg, index) in messages"
            :key="`avatar-${index}`"
            :label="msg.label"
            :sent="msg.sent"
            :text-color="msg.textColor"
            :bg-color="msg.bgColor"
            :name="msg.name"
            :text="msg.text"
            :stamp="msg.stamp"
          />


          </div>

        </q-page>


</template>

<style>
</style>

<script>
import io from 'socket.io-client';

export default {
  name: 'Users',
  data() {
    return {
      user: 'Evgeny',
      message: '',
      messages: [],
      socket : io('localhost:4000/user') //io('https://big-yak-4.localtunnel.me')
    };
  },
  methods: {
        sendMessage() {
            // e.preventDefault();
            const data = {
                user: this.user,
                message: this.message
            }
            this.socket.emit('user message', data);
            this.message = ''
        }
    },
    mounted() {

        this.socket.on('user message', (data) => {
            this.messages.push({name: data.user, text: [data.message], sent: !data.isOperator});
        });



    }
};
</script>
