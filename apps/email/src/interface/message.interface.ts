export interface MessageInterface {
  to: string;

  from?: string;

  subject: string;

  template: string;

  data?: Record<string, any>;
}