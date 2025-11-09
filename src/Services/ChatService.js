
export default class ChatService {
  async get_message(content) {
    try {
      const res = await fetch(`https://chat-api.nicolis.work/?prompt=${encodeURIComponent(content)}`);

      if (!res.ok) throw new Error("Error al conectar con el API");

      const data = await res.json();
      return data.message;
    } catch (err) {
      console.error("Error en get_message:", err);
      return "Ocurrió un error al procesar tu mensaje.";
    }
  }
}
