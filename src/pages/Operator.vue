<template>

        <q-page class="q-pa-md">
          <q-tabs v-model="selectedTab" @select="onTabSelected">
            <q-tab
            v-for="user in users"
            :key="user.name"
            :label="user.name"
            :name="user.name"
            slot="title"
            />
          </q-tabs>

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
      selectedTab: null,
      users: [],
      message: '',
      messages: [],
      socket : io('localhost:4000/operator') //io('https://big-yak-4.localtunnel.me')
    };
  },
  methods: {
        onTabSelected(tab) {
          console.log('onTabSelected', tab)
        },
        sendMessage() {
            // e.preventDefault();
            if(!this.selectedTab){
              return console.log('no user selected')
            }

            const data = {
                user: this.selectedTab,
                message: this.message
            }
            this.socket.emit('operator message', data);
            this.message = ''
        }
    },
    mounted() {

        this.socket.on('user connected', (id) => {
            console.log('user connected', id)
            this.users.push({name: id, id: id});
        });

        this.socket.on('user message', (data) => {
            console.log('user message', data)
            this.messages.push({name: data.user, text: [data.message] });
        });

        this.socket.on('operator message', (data) => {
            console.log('operator message', data)
            this.messages.push({name: data.user, text: [data.message], sent: true });
        });




    }
};
</script>
