import { Button, TextInput, Title, useMantineColorScheme } from "@mantine/core";
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
                className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center hover:cursor-pointer"
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
    const { colorScheme } = useMantineColorScheme();
    const chatBg = colorScheme === 'light' 
                    ? 'w-[380px] h-[600px] bg-gray-100 rounded-lg flex flex-col items-center justify-center' 
                    : 'w-[380px] h-[600px] bg-[#222] rounded-lg flex flex-col items-center justify-center';
    return (<div className={chatBg}>
        <div className={`flex w-full items-center mt-2 pb-2 border-b-2 ${colorScheme === 'light' ? "border-white" : " border-gray-400"}`}>
            <div className="grow flex justify-center">
                <Title order={4} c={colorScheme === 'light' ? "black" : "white"}>Ask Bob about selected recipe</Title>
            </div>
            <p className="font-bold pr-4 hover:cursor-pointer" onClick={handleToggleChat} color={ colorScheme === 'light' ? "black" : "white"}> <IconMinus /> </p>
        </div>

        <div className="grow pt-2 gap-2 flex flex-col overflow-auto" >
        {messages.map((message, index) => {
            const align = message.side === 'left' ? 'justify-start' : 'justify-end';
            const color = colorScheme === 'light' 
            ? message.side === 'left' ? 'bg-gray-50' : 'bg-indigo-400'
            : message.side === 'left' ? 'bg-gray-700' : 'bg-indigo-600';
            const icon = message.side === 'left' 
            ? <IconRobotFace size={40} color="black" className="bg-white flex rounded-full items-center justify-center p-[4px] mr-2"/> 
            : <></>;

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
        <div className={`flex w-full border-t-2 pt-4 ${colorScheme === 'light' ? "border-white" : " border-gray-400"}`}>
            <TextInput className="grow mb-4 ml-4" />
            <Button variant="dark" className="mb-4 mr-4 ml-2 bg-indigo-500"><IconSend/></Button>
        </div>
    </div>);
}

export default ChatAssistant;