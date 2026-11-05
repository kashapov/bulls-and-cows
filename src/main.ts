import { createApp } from './ui/app.js';

const root = document.createElement('div');
root.id = 'app';
document.body.append(root);

createApp(root);
