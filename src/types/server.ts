export interface Server {
    id: string;
    name: string;
    ip?: string;
    port?: number;
    password?: string;
    username?: string;
 }

 export interface ServerForm extends Omit<Server, 'id'> {
    // Additional properties specific to the form
}