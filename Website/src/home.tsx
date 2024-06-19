import { useNavigate } from 'react-router-dom';
import NavigateClass from './NavigateClass'; // Rename your existing Home class to avoid naming conflicts

// This is your new 'Home' functional component that wraps the class component
const Home = () => {
  const navigate = useNavigate(); // Hook to get the navigate function

  // Pass 'navigate' as a prop to your class component
  return <NavigateClass navigate={navigate} />;
};

export default Home;
