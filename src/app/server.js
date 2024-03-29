'use server'

import ollama from 'ollama';

export async function send_chat(message) {
  const response = await ollama.chat({
    model: 'codellama',
    messages: [{ role: 'user', content: message}]
  });

  return response.message.content;
}