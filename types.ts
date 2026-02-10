
export type PageType = 
  | 'dashboard' 
  | 'ai-basic' 
  | 'ai-style' 
  | 'ai-condition' 
  | 'kb-register' 
  | 'kb-manage' 
  | 'kb-api' 
  | 'test-chat' 
  | 'install-guide' 
  | 'chat-manage' 
  | 'security-center'
  | 'test-toast';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}
