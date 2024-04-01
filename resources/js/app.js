

import './bootstrap';
import { createApp } from "vue";
import axios from "axios";

import ChatMessage from './components/ChatMessage.vue';
import ChatForm from './components/ChatForm.vue';



const app = createApp({
    el: '#app',

    //Store chat messages for display in this array.
    data(){
        return{
            messages: [],
        };
    },
    //Upon initialisation, run fetchMessages(). 
    created() {
        this.fetchMessages();

        window.Echo.private('chat')
        .listen('MessageSent', (e) => {
            this.messages.push({
            message: e.message.message,
            user: e.user
            });
        });
    },
    methods: {
        fetchMessages() {
            //GET request to the messages route in our Laravel server to fetch all the messages
            axios.get('/messages').then(response => {
                //Save the response in the messages array to display on the chat view
                this.messages = response.data;
            });
        },
        //Receives the message that was emitted from the ChatForm Vue component
        addMessage(message) {
            //Pushes it to the messages array
            this.messages.push(message);
            //POST request to the messages route with the message data in order for our Laravel server to broadcast it.
            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }
});

app.component('chat-message', ChatMessage);
app.component('chat-form', ChatForm);

app.mount('#app');
