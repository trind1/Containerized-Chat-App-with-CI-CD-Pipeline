import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectId = '1b7801d6-8a66-4be4-a442-89219d833dfc';
const audioUrl =
  'https://chat-engine-assets.s3.amazonaws.com/click.mp3';

const App = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const handleNewMessage = () => {
    new Audio(audioUrl).play();
  };

  if (!username) {
    return <LoginForm />;
  }

  return (
    <ChatEngine
      height="100vh"
      projectID={projectId}
      userName={username}
      userSecret={password}
      renderChatFeed={(chatAppProps) => (
        <ChatFeed {...chatAppProps} />
      )}
      onNewMessage={handleNewMessage}
    />
  );
};

export default App;