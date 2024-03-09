import { Button, TextInput, Title } from "@mantine/core";
import { IconMessageCircle2, IconMinus, IconSend } from "@tabler/icons-react";
import React from "react";

const ChatAssistant = () => {
    const [toggleChat, setToggleChat] = React.useState<boolean>(false);
    const handleToggleChat = () => setToggleChat(prev => !prev);

    const messages = [
        { text: "Hello, how can I help you?", side: 'left', isLoading: false},
        { text: "I'm looking for a recipe", side: 'right', isLoading: false},
        { text: "What type of recipe?", side: 'left' , isLoading: false},
        { text: "I'm looking for a recipe for a cake", side: 'right' , isLoading: false},
        { text: "I have a great recipe for a chocolate cake", side: 'left' , isLoading: false},
        { text: "Can you share it with me?", side: 'right' , isLoading: false},
        { text: "Sure, here it is", side: 'left' , isLoading: false},
        { isLoading: true},
    ] as Message[];

    return (
        <div className="absolute bottom-[25px] right-[25px]">
            {!toggleChat && (<div
                className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center"
                onClick={handleToggleChat}>
                <IconMessageCircle2 size={32} color="white" />
            </div>)
            }
            {toggleChat && <ChatBox handleToggleChat={handleToggleChat} messages={messages} />}

        </div>
    );
}

type ChatBoxProps = {
    handleToggleChat: () => void;
    messages: Message[];
}

const ChatBox = ({ handleToggleChat, messages }: ChatBoxProps) => {
    return (<div className="w-[380px] h-[600px] bg-[#F5A9B8] rounded-lg flex flex-col items-center justify-center">
        <div className="flex w-full items-center mt-2">
            <div className="grow flex justify-center">
                <Title order={4}>Ask about selected recipe</Title>
            </div>
            <p className="font-bold pr-4 " onClick={handleToggleChat}> <IconMinus /> </p>
        </div>

        <div className="grow pt-2 gap-2 flex flex-col overflow-auto" >
        {messages.map((message, index) => {
            const align = message.side === 'left' ? 'justify-start' : 'justify-end';
            const color = message.side === 'left' ? 'bg-white' : 'bg-[#5BCEFA]';
            
            return (
            <div key={"message_" + index} className={"flex " + align}>
            <div className={`${color} p-2 rounded-lg`}>
                    <p>
                        {message.isLoading === false ?  message.text : "Loading..."}
                        </p>
                </div>
            </div>
        )})}    
        </div>
        <div className="flex w-full">
            <TextInput className="grow" />
            <Button variant="dark"><IconSend/></Button>
        </div>
    </div>);
}

export default ChatAssistant;