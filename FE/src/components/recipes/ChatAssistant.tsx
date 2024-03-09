import { Button, TextInput, Title } from "@mantine/core";
import { IconMessageCircle2, IconMinus, IconRobotFace, IconSend } from "@tabler/icons-react";
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
                className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center hover:cursor-pointer"
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
    return (<div className="w-[380px] h-[600px] bg-[#CCC] rounded-lg flex flex-col items-center justify-center">
        <div className="flex w-full items-center mt-2 pb-2 border-b-2 border-white">
            <div className="grow flex justify-center">
                <Title order={4}>Ask Bob about selected recipe</Title>
            </div>
            <p className="font-bold pr-4 hover:cursor-pointer" onClick={handleToggleChat}> <IconMinus /> </p>
        </div>

        <div className="grow pt-2 gap-2 flex flex-col overflow-auto" >
        {messages.map((message, index) => {
            const align = message.side === 'left' ? 'justify-start' : 'justify-end';
            const color = message.side === 'left' ? 'bg-white' : 'bg-[#0AF]';
            const icon = message.side === 'left' ? <IconRobotFace size={40} color="black" className="bg-white flex rounded-full items-center justify-center p-[4px] mr-2"/> :<></>;

            return (
            <div key={"message_" + index} className={"flex " + align}>
                {icon}
                <div className={`${color} p-2 rounded-lg`}>
                    <p>
                        {message.isLoading === false ?  message.text : "Loading..."}
                        </p>
                </div> 
            </div>
        )})}    
        </div>
        <div className="flex w-full border-t-2 pt-4 border-white">
            <TextInput className="grow mb-4 ml-4" />
            <Button variant="dark" className="mb-4 mr-4 ml-2"><IconSend/></Button>
        </div>
    </div>);
}

export default ChatAssistant;