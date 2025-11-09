import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ChatService from '../../Services/ChatService';
import logoPerfil from '../../assets/Perfil.jpg';

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: 1, from: "bot", text: "¡Hola! Soy tu asistente virtual 🤖", avatar: logoPerfil },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const chatService = new ChatService();

    // Auto scroll al final
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // Función para enviar mensaje del usuario y obtener respuesta del bot
    const sendMessage = async () => {
        if (!input.trim()) return;

        // Mensaje del usuario
        const userMessage = {
            id: Date.now(),
            from: "user",
            text: input,
            avatar: "https://i.pravatar.cc/40?img=5",
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            // Llamada a la API
            const botReply = await chatService.get_message(input);

            // Agregamos la respuesta del bot
            const botMessage = {
                id: Date.now() + 1,
                from: "bot",
                text: botReply,
                avatar: logoPerfil,
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                from: "bot",
                text: "Error: no se pudo obtener respuesta 🤖",
                avatar: logoPerfil,
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 relative overflow-hidden">
            <div className="absolute w-full h-1/2 bg-gradient-to-r from-primary-blue to-secundary-green [clip-path:polygon(0_0,100%_0,0_100%)] z-[-1]" />

            <div className="flex flex-col flex-1 overflow-hidden border-gray-300 shadow-lg md:border-2 bg-white md:mt-10 md:mb-10 md:mx-30 md:rounded-lg ">

                <div className="flex-1 overflow-y-auto m-5 flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
                    {messages.map(msg => {
                        const isUser = msg.from === "user";
                        return (
                            <div key={msg.id} className={`flex items-end ${isUser ? "justify-end" : "justify-start"}`}>
                                {!isUser && (
                                    <img src={msg.avatar} alt="bot" className="w-8 h-8 rounded-full mr-2 object-cover" />
                                )}

                                <div className={`px-4 py-2 rounded-2xl text-sm break-words ${isUser
                                    ? "bg-primary-blue text-white rounded-br-none max-w-[80%]"
                                    : "bg-gray-200 text-gray-800 rounded-bl-none max-w-[80%]"
                                    }`}>
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>

                                {isUser && (
                                    <img src={msg.avatar} alt="user" className="w-8 h-8 rounded-full ml-2" />
                                )}
                            </div>
                        );
                    })}

                    {/* Solo un recuadro de "Pensando..." mientras la API responde */}
                    {isTyping && (
                        <div className="flex items-end justify-start space-x-2 animate-pulse">
                            <img src={logoPerfil} alt="bot" className="w-8 h-8 rounded-full object-cover" />
                            <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 text-sm rounded-bl-none">
                                Pensando...
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="flex items-center p-4 border-t border-gray-300 bg-white">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isTyping}
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 px-4 py-2 bg-primary-blue text-white rounded-lg text-sm hover:bg-blue-600 transition"
                        disabled={isTyping}
                    >
                        Enviar
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-r from-primary-blue to-secundary-green [clip-path:polygon(100%_0,100%_100%,0_100%)] z-[-1]" />
        </div>
    );
}
