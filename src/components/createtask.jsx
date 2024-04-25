import { useState, useRef, useEffect } from 'react';
import Task from './tasks';

const Create = () => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [details, setDetails] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [taskdata,settaskdata] = useState('');
    const formRef = useRef(null);



    useEffect(() => {
        if (taskdata) {
            localStorage.setItem('data', JSON.stringify(taskdata));
        }
    }, [taskdata]);
    
    

    const getItemFromLocalStorage = (key) => {
        try {
            const item = localStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            }
            return null;
        } catch (error) {
            console.error('Error retrieving item from local storage:', error);
            return null;
        }
    };

     const savedTaskData = getItemFromLocalStorage('data');
    

    // Function to fetch the tasks from api
    const fetchTasks = async () => {
        try {
            const savedTaskData = localStorage.getItem('data');
            if (savedTaskData) {
                settaskdata(JSON.parse(savedTaskData));
            } else {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                const tasks = data.map((task) => ({
                    id: task.id.toString(),
                    title: task.title,
                    completed: task.completed
                }));
               
                settaskdata(tasks);
                localStorage.setItem('data', JSON.stringify(tasks));
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchTasks();
       
    }, []);
    



    // To close the addtask pop up when someone clicks outside it
    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowForm(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    

   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setTitle('');
        setStatus('');
        setDetails('');
        setShowForm(false);
    };

    // Function to add a task
    const addtask = () => {
        const task ={
            id:taskdata.length+1,
            title:title,
           completed: status==='COMPLETED',
           details:details
        }
        settaskdata([
            ...taskdata,
            task
        ])
    } 

    // Function to delete a task
    const deletetask = (taskId) => {

        const updatedTasks = taskdata.filter(task => task.id !== taskId);
        settaskdata(updatedTasks);
        localStorage.setItem('data', JSON.stringify(updatedTasks));
    };
    
    

    return (
        <div>
            <div className="w-screen mt-10 md:text-lg lg:text-2xl mx-auto px-2 rounded-lg py-2 gap-1 bg-[#ed8936] max-w-fit text-white">
                <div className='flex gap-1 items-center justify-center'>
                    <h1 className="text-center cursor-pointer" onClick={() => setShowForm(true)}>CREATE TASK</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </div>
            <Task taskdata={taskdata}  deletetask={deletetask} addtask={addtask} settaskdata={settaskdata}/>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div ref={formRef} className="bg-[#4a5568] p-6 rounded-lg md:w-1/2 w-4/5 ">
                        <div className='flex justify-between'>
                            <h1 className="md:text-xl text-lg mb-4">Create New Task</h1>
                            <h1 className='mr-4 cursor-pointer' onClick={() => setShowForm(false)}>X</h1>
                        </div>
                       
                        <form className='' onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title">Title*</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-lg p-2 px-4"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    className="w-full border-gray-300 rounded-lg p-2"
                                >
                                    <option value="">Select</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="details">Details</label>
                                <textarea
                                    id="details"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="w-full border-gray-300 rounded-lg p-2 px-4"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={addtask}>Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Create;