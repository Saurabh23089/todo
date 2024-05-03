import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Task = ({ taskdata, deletetask, addtask, settaskdata }) => {

  console.log(taskdata);

  const [showtaskip, setshowtaskip] = useState(false);
  const [showicon, setshowicon] = useState(true);
  const [showtaskc, setshowtaskc] = useState(false);

  const toggleshowtasks = () => {
    setshowtaskip(prev => !prev);
  }

  const toggleshowtaskss = () => {
    setshowtaskc(prev => !prev);
  }


  // To handle window resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        // show tasks when the window is resized to laptop view
        setshowtaskip(true);
        setshowtaskc(true);
      }
    }

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showtaskip, showtaskc]);


  function onDragEnd(result) {
    const { source, destination, draggableId } = result;

    // If there's no destination or the task is dropped in the same position, return
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // If tasks are dropped within the same category
    if (source.droppableId === destination.droppableId) {
      const newTaskData = [...taskdata];
      const movedTask = newTaskData.find(task => task.id === draggableId);
      newTaskData.splice(source.index, 1);
      newTaskData.splice(destination.index, 0, movedTask);
      settaskdata(newTaskData);
    } else {
      // If tasks are dropped between different categories
      const updatedTaskData = taskdata.map(task => {
        if (task.id === draggableId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      settaskdata(updatedTaskData);
    }
  }





  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="flex flex-col md:gap-4 mb-12 gap-2 flex-col md:flex-row mt-10 justify-center items-center md:items-start overflow-hidden  mx-8">
          <div className='flex flex-col gap-4 md:flex-col md:w-6/12'>
            <h1 className="text-xl text-center">IN PROGRESS</h1>
            <div className='flex items-center justify-center gap-2'>
            <h2 className="text-lg text-center ">{taskdata && taskdata.filter(task => !task.completed).length} tasks</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 md:hidden" onClick={toggleshowtasks}>
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            </div>
           
            <Droppable droppableId='inProgres'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col  items-center bg-[#feebc8] w-5/6 mb-8 rounded-lg'>
                  {taskdata && taskdata.map((task, index) => (
                    !task.completed && (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`flex flex-col bg-[#00a3c4] w-4/5 rounded-lg my-4 ${showtaskip || window.innerWidth >= 768 ? '' : 'hidden'}`}>
                            <div className='flex items-center flex-col my-4'>
                              <h1 className="m-6 font-bold">{task.title}</h1>
                              <h6 className='mb-8'>{task.details}</h6>
                              {showicon &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => deletetask(task.id)}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              }
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className='flex flex-col gap-4 md:flex-col md:w-6/12'>
            <h1 className="text-xl text-center">COMPLETED</h1>
            <div className='flex items-center justify-center gap-2'>
            <h2 className="text-lg text-center ">{taskdata && taskdata.filter(task => task.completed).length} tasks</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 md:hidden" onClick={toggleshowtaskss}>
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            </div>
           
            <Droppable droppableId='completedd'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col  items-center bg-[#feebc8] rounded-lg w-5/6 mb-8'>
                  {taskdata && taskdata.map((task, index) => (
                    task.completed && (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`flex flex-col bg-[#00a3c4] w-4/5 rounded-lg my-4 ${showtaskc || window.innerWidth >= 768 ? '' : 'hidden'}`}>
                            <div className='flex items-center flex-col my-4'>
                              <h1 className="m-6 font-bold">{task.title}</h1>
                              <h6 className='mb-8'>{task.details}</h6>
                              {showicon &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => deletetask(task.id)}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              }
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>                 
        </div>
      </div>
    </DragDropContext>
  );






}

export default Task;