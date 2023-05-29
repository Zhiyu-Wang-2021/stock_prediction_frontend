import * as React from 'react';
import Chatbot, {createCustomMessage} from "react-chatbot-kit";
import ChatIcon from '@mui/icons-material/Chat';
import 'react-chatbot-kit/build/main.css'
import './chatbot.css'

import {validateInput, saveMessages, loadMessages} from "./ChatbotFunctions"
import {CircularProgress, Fab} from "@mui/material";

import {getToken, sendMsgToApi} from "./ChatbotApiConnection";
import HtmlMessage from "./CustomMsg";
// import assert from "assert";

const botName = "Stock Prediction Assistant"


export default function CustomChatbot({chatbotApi, setChatbotApi}) {
    const [showBot, setShowBot] = React.useState(false)
    const [isConnecting, setIsConnecting] = React.useState(false)

    const chatbotConfig = {
        state: {
            token: chatbotApi.token,
        },
        initialMessages: [
            createCustomMessage("custom", 'htmlMsg', {
                payload: {
                    message: `Hi! I'm ${botName}. How can I help you?`
                }
            })
        ],
        botName: botName,
        customStyles: {
            botMessageBox: {
                backgroundColor: '#005EB8',
            },
            chatButton: {
                backgroundColor: '#005EB8',
            },
            chatContainer: {
                width: '1000px',
            },
        },
        customComponents: {
            // Replaces the default header
            header: () => (<div
                style={{
                    backgroundColor: '#005EB8',
                    padding: "12px",
                    borderRadius: "3px",
                    color: "white",
                }}
            >
                <div style={{
                    display: "table",
                    width: "100%"
                }}>
                    <p style={{
                        display: "table-cell",
                        textAlign: "left"
                    }}>{botName}</p>
                    <p onClick={() => setShowBot(false)} style={{
                        display: "table-cell",
                        textAlign: "right"
                    }}>X</p>
                </div>

            </div>),
            botAvatar: () => (<div></div>),
            userAvatar: () => (<div></div>),

        },
        customMessages: {
            htmlMsg: (props) => <HtmlMessage {...props} />,
        },
    };

    /**
     * This function listens the message input from user, and it will call different actions
     * according to the message parse result. Here, as long as the message is not empty, it
     * will call the "handleMessage" function from the "ActionProvider"
     * @param children
     * @param actions
     * @returns {JSX.Element}
     * @constructor
     */
    const MessageParser = ({ children, actions }) => {
        const parse = (message) => {
            if(message !== ""){
                actions.handleMessage(message).catch(err => console.error((err)))
            }
        };

        return (
            <div>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        parse: parse,
                        actions,
                    });
                })}
            </div>
        );
    };

    /**
     * This function stores the actions that can be called by the "MessageParser".
     * @param setState
     * @param children
     * @returns {JSX.Element}
     * @constructor
     */
    const ActionProvider = ({ setState, children }) => {
        /*
            This function send the message from the user to API and creates an answer message
            element from API's response
         */
        const handleMessage = async (userMsg) => {

            const resp = await sendMsgToApi(1111, 1111, userMsg)
            console.log(resp)
            const botMessage = createCustomMessage("custom", 'htmlMsg', {
                payload: {
                    message: resp !== undefined ? resp["text"] : "ERROR"
                }
            })

            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
            }));
        };

        // Put the handleMessage function in the actions object to pass to the MessageParser
        return (
            <div>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        actions: {
                            handleMessage,
                        },
                    });
                })}
            </div>
        );
    };
    /**
     * This function starts a session with API
     * @returns {Promise<void>}
     */
    const handleStartChatSession = async () => {
       // NEED IMPLEMENT
        setShowBot(true)
    }

    if(showBot) {
        return (
            <div className="custom-chatbot-container">
                <Chatbot
                    config={chatbotConfig}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    messageHistory={loadMessages()}
                    saveMessages={saveMessages}
                    validator={validateInput}
                />
            </div>
        );
    } else {
        return (
            <Fab
                onClick={handleStartChatSession}
                color={isConnecting ? "warning": "primary"}
                aria-label="add"
                sx={{
                    position: "fixed",
                    bottom: "3%",
                    right: "2%",
                    zIndex: "999"
                }}
            >
                {
                    isConnecting ? <CircularProgress color="inherit" /> : <ChatIcon />
                }
            </Fab>
        )
    }
}
