import React from 'react'
import CustomChatbot from "../component/ChatbotInterface/CustomChatbot";
export default function ChatbotTest() {
    const [chatbotApi, setChatbotApi] = React.useState({
        token: 1111
    })


    return (
        <CustomChatbot chatbotApi={chatbotApi} setChatbotApi={setChatbotApi}/>
    )
}