import { useState,useEffect } from 'react';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';

const Task = ({taskdata,deletetask,addtask,settaskdata}) => {

    const [showtaskip, setshowtaskip] = useState(false);
    const [showicon,setshowicon] = useState(true);
    const [showtaskc,setshowtaskc] = useState(false);

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
    },[showtaskip,showtaskc]); 


    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const newtask = [...taskdata];
        const [removed] = newtask.splice((result.source.index), 1);
        newtask.splice(result.destination.index, 0, removed);
        settaskdata(newtask);
        
    }

    

    return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div>
            <div className="flex flex-col md:gap-4 mb-12 gap-2 flex-col md:flex-row  mt-10 justify-center items-center md:items-start overflow-hidden w-full">
               <div className="flex h-auto flex-col justify-between gap-4 md:flex-row md:mx-24 mx-8  ">

                {/* In Progress  */}
                <div className='flex flex-col gap-4 flex-col md:w-6/12 w-screen'>
                <h1 className="text-xl text-center">IN PROGRESS</h1>
               <Droppable droppableId='inprogresss'>
                {(provided) => (
                      <div className="flex flex-col items-center justify-center gap-1 bg-[#feebc8]   px-12 rounded-lg pt-2"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      >
                          <div className="flex items-center gap-2 my-4 " >
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 md:hidden my-4" onClick={toggleshowtasks}>
                                     <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                 </svg>
                                 <h1 className="text-xl md:hidden">{taskdata&&taskdata.filter(task => task.completed===false ).length} tasks</h1>
                             </div>

                                        {taskdata &&
                                            taskdata.filter((task) => {
                                               return task.completed===false
                                            }).map((task,index) => {
                                                return (<Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <div className={`flex flex-col bg-[#00a3c4] w-full  rounded-lg mb-4 ${showtaskip || window.innerWidth>=768 ?'':'hidden' }` }
                                                       
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        >
                                                          <div className='flex items-center flex-col  my-4'  >
                                                            <h1 className="m-6 font-bold ">{task.title}</h1>
                                                            <h6 className='mb-8'>{task.details}</h6>
                                                         {  showicon && 
                                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" onClick={() => {deletetask(task.id)}}>
                                                                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                              </svg>
                                                         }
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                                )

                                            })
                                        }
                                
                                {provided.placeholder}
                      </div>
                )}
               </Droppable>
                </div>
              

               {/* Completed  */}
               <div className='flex flex-col gap-4 flex-col md:w-6/12 w-screen'>
                <h1 className="text-xl text-center">COMPLETED</h1>
               <Droppable droppableId='completed'>
                {(provided) => (
                      <div className="flex flex-col items-center justify-center gap-1 bg-[#feebc8]   px-12 rounded-lg pt-2"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      >
                          <div className="flex gap-2 items-center my-4 " >
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 md:hidden" onClick={toggleshowtaskss}>
                                     <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                 </svg>
                                 <h1 className="text-xl md:hidden"> {taskdata && taskdata.filter(task => task.completed===true).length} tasks</h1>
                             </div>

                                        {taskdata &&
                                            taskdata.filter((task) => {
                                               return task.completed===true
                                            }).map((task,index) => {
                                                return (<Draggable key={task.id} draggableId={task.title} index={index}>
                                                    {(provided) => (
                                                        <div className={`flex flex-col bg-[#00a3c4] w-full text-center rounded-lg mb-4 ${showtaskc || window.innerWidth>=768 ?'':'hidden' }` }
                                                       
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        >
                                                          <div className='flex flex-col items-center my-4'  >
                                                            <h1 className="flex justify-left m-6 font-bold ">{task.title}</h1>
                                                            <h6 className='mb-8 items-left'>{task.details}</h6>
                                                         {  showicon && 
                                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 " onClick={() => {deletetask(task.id)}}>
                                                                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                              </svg>
                                                         }
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                                )

                                            })
                                        }
                                
                                {provided.placeholder}
                      </div>
                )}
               </Droppable>
                </div>

               </div>
            </div>
        </div>
    </DragDropContext>
 
    )
    

   
}

export default Task;