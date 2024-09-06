import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import User from './components/user.component';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const errorShown = useRef(false);

  const fetchUsersTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/all_task_usernames`);
      setData(response.data.usersWithTaskTexts);
      setLoading(false);
    } catch (error) {
      if (!errorShown.current) {
        console.error('Error fetching tasks:', error);
        toast.error('Error fetching tasks');
        errorShown.current = true;
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsersTasks();
  }, []);

  const moveTask = async (sourceUserId, targetUserId, taskText) => {
    try {
      // Ensure the request URL matches your API endpoint
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/move-task`, {
        sourceUserId,
        targetUserId,
        taskText,
      }); 
  
      setData((prevUsers) => {
        // If the source and target users are the same, return previous state without any changes
        if (parseInt(sourceUserId, 10) === parseInt(targetUserId, 10)) {
          return prevUsers;
        }
  
        const updatedUsers = prevUsers.map((user) => {
          if (user.user_id === parseInt(sourceUserId, 10)) {
            // Remove task from source user
            return {
              ...user,
              tasks: user.tasks.filter((task) => task.text !== taskText),
            };
          }
  
          if (user.user_id === parseInt(targetUserId, 10)) {
            // Add task to target user
            return {
              ...user,
              tasks: [...user.tasks, { text: taskText }],
            };
          }
  
          return user;
        });
  
        return updatedUsers;
      });
    } catch (error) {
      // Enhanced error logging
      console.error('Error moving task:', error.response ? error.response.data : error.message);
      toast.error('Failed to move task');
    }
  };
  


  return (
    <div className="App bg-zinc-900 h-auto">
      <center>
        <h1 className="text-[145px] font-semibold text-white">Users Tasks</h1>
      </center>

      <div className="flex flex-row flex-wrap justify-center items-center gap-4 p-4">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          data.map((element) => (
            <User
              key={element.user_id}
              data={element}
              moveTask={moveTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
